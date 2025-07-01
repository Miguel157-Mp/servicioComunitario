const express = require('express');
const pool = require('../database/db');
const router = express.Router();

// Obtener los horarios agendados por salón, incluyendo profesor y materia
router.get('/agendados-por-salon/:idSalon', async (req, res) => {
    const { idSalon } = req.params;
    try {
        const result = await pool.query(
            `SELECT
                sh."IdSeccionHorario",
                sh."idBloqueHorario",
                sh."idDiaSemana",
                sh."idSalon",
                s."idSeccion",
                p."idProfesor",
                p."nbProfesor" AS nombre_profesor,
                m."nbMateria" AS nombre_materia
            FROM public."seccionHorario" sh
            INNER JOIN public."seccion" s ON s."idSeccion" = sh."idSeccion"
            INNER JOIN public."profesor" p ON s."idProfesor" = p."idProfesor"
            INNER JOIN public."materia" m ON s."idMateria" = m."idMateria"
            WHERE sh."idSalon" = $1`,
            [idSalon]
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Error al consultar horarios agendados por salón:', error);
        res.status(500).json({ message: 'Error al consultar horarios agendados por salón' });
    }
});

// Consultar ocupación de salones para un bloque y día
router.get('/ocupacion-salones', async (req, res) => {
    let { idDiaSemana, idBloqueHorario } = req.query;

    // Permitir arrays o valores únicos
    if (!idDiaSemana || !idBloqueHorario) {
        return res.status(400).json({ message: 'Faltan parámetros requeridos' });
    }
    // Convertir a arrays si no lo son
    if (!Array.isArray(idBloqueHorario)) idBloqueHorario = [idBloqueHorario];
    if (!Array.isArray(idDiaSemana)) idDiaSemana = [idDiaSemana];

    try {
        // Todos los salones
        const allSalones = await pool.query('SELECT "idSalon", "capacidad", "modulo" FROM public."salon"');

        // Salones ocupados para cada combinación de bloque y día
        const ocupados = await pool.query(
            `SELECT "idSalon", "idDiaSemana", "idBloqueHorario"
             FROM public."seccionHorario"
             WHERE "idDiaSemana" = ANY($1::int[]) AND "idBloqueHorario" = ANY($2::int[])`,
            [idDiaSemana.map(Number), idBloqueHorario.map(Number)]
        );

        // Agrupar resultados por bloque y día
        const result = {};
        for (const dia of idDiaSemana) {
            for (const bloque of idBloqueHorario) {
                const ocupadosEnEste = ocupados.rows
                    .filter(r => r.idDiaSemana == dia && r.idBloqueHorario == bloque)
                    .map(r => r.idSalon);
                const disponibles = allSalones.rows.filter(s => !ocupadosEnEste.includes(s.idSalon));
                const ocupadosList = allSalones.rows.filter(s => ocupadosEnEste.includes(s.idSalon));
                result[`dia${dia}_bloque${bloque}`] = {
                    disponibles,
                    ocupados: ocupadosList
                };
            }
        }
        res.json(result);
    } catch (error) {
        console.error('Error al consultar ocupación de salones:', error);
        res.status(500).json({ message: 'Error al consultar ocupación de salones' });
    }
});

// Consultar salones disponibles para un bloque y día (solo id y capacidad)
router.get('/salones-disponibles', async (req, res) => {
    const { idDiaSemana, idBloqueHorario } = req.query;
    if (!idDiaSemana || !idBloqueHorario) {
        return res.status(400).json({ message: 'Faltan parámetros requeridos' });
    }
    try {
        // Buscar los salones ocupados en ese bloque y día
        const ocupados = await pool.query(
            `SELECT sh."idSalon", sh."idDiaSemana",d."nbDiaDeLaSemana" as nbDiaSemana
                FROM public."seccionHorario" sh
                inner join public."diaDeLaSemana" d on sh."idDiaSemana" = d."idDiaDeLaSemana"
            WHERE sh."idDiaSemana" = ANY($1::int[]) AND sh."idBloqueHorario" = ANY($2::int[])`,
            [idDiaSemana, idBloqueHorario]
        );
        const salonesOcupados = ocupados.rows.map(r => r.idSalon);

        // Listar todos los salones que NO están ocupados en ese bloque
        let querySalones = 'SELECT "idSalon", capacidad FROM public."salon"';
        let params = [];
        if (salonesOcupados.length > 0) {
            const placeholders = salonesOcupados.map((_, i) => `$${i + 1}`).join(',');
            querySalones += ` WHERE "idSalon" NOT IN (${placeholders})`;
            params = salonesOcupados;
        }
        const salonesDisponibles = await pool.query(querySalones, params);
        res.json(salonesDisponibles.rows); // [{ idSalon, capacidad }, ...]
        console.log('Salones disponibles:', salonesDisponibles.rows);
    } catch (error) {
        console.error('Error al consultar salones disponibles:', error);
        res.status(500).json({ message: 'Error al consultar salones disponibles' });
    }
});


// Obtener todos los registros de seccionHorario o filtrar por idSalon
router.get('/', async (req, res) => {
    const { salon } = req.query;
    
        let query = 'SELECT "IdSeccionHorario", "idBloqueHorario", "idDiaSemana", "idSalon", "idSeccion" FROM public."seccionHorario"';
        let params = [];
        if (salon) {
            query += ' WHERE "idSalon" = $1';
            params.push(salon);
        }
        const result = await pool.query(query, params);
        res.json(result.rows);
     
      
    
});

// Obtener un registro por IdSeccionHorario
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            'SELECT "IdSeccionHorario", "idBloqueHorario", "idDiaSemana", "idSalon", "idSeccion" FROM public."seccionHorario" WHERE "IdSeccionHorario" = $1',
            [id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Registro no encontrado' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al obtener registro:', error);
        res.status(500).json({ message: 'Error al obtener registro' });
    }
});

// Crear un nuevo registro
router.post('/', async (req, res) => {
    const { idBloqueHorario, idDiaSemana, idSalon, idSeccion, idProfesor } = req.body;
    console.log('Datos recibidos para crear registro:', req.body);
    if (!idBloqueHorario || !idDiaSemana || !idSalon || !idSeccion || !idProfesor) {
        return res.status(400).json({ message: 'Por favor, complete todos los campos requeridos.' });
    }
    try {
        // 1. Validar duplicidad exacta
        const check = await pool.query(
            `SELECT 1 FROM public."seccionHorario"
             WHERE "idBloqueHorario" = $1 AND "idDiaSemana" = $2 AND "idSalon" = $3 AND "idSeccion" = $4`,
            [idBloqueHorario, idDiaSemana, idSalon, idSeccion]
        );
        if (check.rowCount > 0) {
            return res.status(409).json({ message: 'Ya existe un agendamiento para este bloque, salón y sección.' });
        }

        
        // 2. Validar que el horario esté disponible para el profesor
        const disponible = await pool.query(
            `SELECT 1 FROM public."horarioProfesorPorDia"
             WHERE "idProfesor" = $1 AND "idDiaSemana" = $2 AND "idBloqueHorario" = $3`,
            [idProfesor, idDiaSemana, idBloqueHorario]
        );
        if (disponible.rowCount === 0) {
            return res.status(409).json({
                message: 'El profesor no tiene disponibilidad en este bloque y día. Solo puedes agendar en bloques donde el profesor esté disponible.'
            });
        }

        // Validar que el profesor no esté agendado en otro salón en ese bloque y día
        const profCheck = await pool.query(
            `SELECT sh."idSalon", sh."idSeccion", sh."idDiaSemana", sh."idBloqueHorario"
            FROM public."seccionHorario" sh
            INNER JOIN public."seccion" s ON sh."idSeccion" = s."idSeccion"
            WHERE sh."idBloqueHorario" = $1 AND sh."idDiaSemana" = $2 AND s."idProfesor" = $3`,
            [idBloqueHorario, idDiaSemana, idProfesor]
        );
        if (profCheck.rowCount > 0) {
            const { idSalon, idSeccion, idDiaSemana, idBloqueHorario } = profCheck.rows[0];
            return res.status(409).json({
                message: `El profesor ya tiene un agendamiento en el salón ${idSalon}, sección ${idSeccion}, el día ${idDiaSemana}, bloque ${idBloqueHorario}. Un profesor no puede estar en dos salones distintos al mismo tiempo.`
            });
        }

        // 3. Insertar el registro si pasa las validaciones
        const result = await pool.query(
            `INSERT INTO public."seccionHorario"
            ("idBloqueHorario", "idDiaSemana", "idSalon", "idSeccion")
            VALUES ($1, $2, $3, $4)
            RETURNING "IdSeccionHorario", "idBloqueHorario", "idDiaSemana", "idSalon", "idSeccion"`,
            [idBloqueHorario, idDiaSemana, idSalon, idSeccion]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error al crear registro:', error);
        res.status(500).json({ message: 'Ocurrió un error inesperado al crear el agendamiento. Intente nuevamente.' });
    }
});

// Actualizar un registro por IdSeccionHorario
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { idBloqueHorario, idDiaSemana, idSalon, idSeccion } = req.body;
    try {
        const result = await pool.query(
            `UPDATE public."seccionHorario"
             SET "idBloqueHorario" = $1, "idDiaSemana" = $2, "idSalon" = $3, "idSeccion" = $4
             WHERE "IdSeccionHorario" = $5
             RETURNING "IdSeccionHorario", "idBloqueHorario", "idDiaSemana", "idSalon", "idSeccion"`,
            [idBloqueHorario, idDiaSemana, idSalon, idSeccion, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Registro no encontrado' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al actualizar registro:', error);
        res.status(500).json({ message: 'Error al actualizar registro' });
    }
});

// Eliminar un registro por IdSeccionHorario
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            'DELETE FROM public."seccionHorario" WHERE "IdSeccionHorario" = $1 RETURNING *',
            [id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Registro no encontrado' });
        }
        res.json({ message: 'Registro eliminado', registro: result.rows[0] });
    } catch (error) {
        console.error('Error al eliminar registro:', error);
        res.status(500).json({ message: 'Error al eliminar registro' });
    }
});

router.get('/agendados-por-profesor/:idProfesor', async (req, res) => {
    const { idProfesor } = req.params;
    try {
        const result = await pool.query(
            `SELECT
                sh."IdSeccionHorario",
                sh."idBloqueHorario",
                sh."idDiaSemana",
                sh."idSalon",
                s."idSeccion",
                p."idProfesor",
                p."nbProfesor" AS nombre_profesor,
                m."nbMateria" AS nombre_materia,
                sh."idBloqueHorario" as idBloqueHorario,
                sh."idDiaSemana" as idDiaSemana,
                sh."idSalon" as idSalon
            FROM public."seccionHorario" sh
            INNER JOIN public."seccion" s ON s."idSeccion" = sh."idSeccion"
            INNER JOIN public."profesor" p ON s."idProfesor" = p."idProfesor"
            INNER JOIN public."materia" m ON s."idMateria" = m."idMateria"
            WHERE p."idProfesor" = $1`,
            [idProfesor]
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Error al consultar horarios agendados por profesor:', error);
        res.status(500).json({ message: 'Error al consultar horarios agendados por profesor' });
    }
});






module.exports = router;
const express = require('express');
const router = express.Router();
const pool = require('../database/db');

// Obtener los horarios de examen agendados por salón, incluyendo profesor y materia
router.get('/agendados-por-salon/:idSalon', async (req, res) => {
    const { idSalon } = req.params;
    try {
        const result = await pool.query(
            `SELECT
                he."idHorarioExamen",
                he."idBloqueHorario",
                he."idDiaSemana",
                he."idSalon",
                he."idSeccion",
                he."idProfesor",
                s."idProfesor" AS seccion_idProfesor,
                p."nbProfesor" AS nombre_profesor,
                m."nbMateria" AS nombre_materia
            FROM public."horarioExamen" he
            INNER JOIN public."seccion" s ON s."idSeccion" = he."idSeccion"
            INNER JOIN public."profesor" p ON he."idProfesor" = p."idProfesor"
            INNER JOIN public."materia" m ON s."idMateria" = m."idMateria"
            WHERE he."idSalon" = $1`,
            [idSalon]
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Error al consultar horarios de examen agendados por salón:', error);
        res.status(500).json({ message: 'Error al consultar horarios de examen agendados por salón' });
    }
});

// Consultar ocupación de salones para un bloque y día en horario de examen
router.get('/ocupacion-salones', async (req, res) => {
    let { idDiaSemana, idBloqueHorario } = req.query;

    if (!idDiaSemana || !idBloqueHorario) {
        return res.status(400).json({ message: 'Faltan parámetros requeridos' });
    }
    if (!Array.isArray(idBloqueHorario)) idBloqueHorario = [idBloqueHorario];
    if (!Array.isArray(idDiaSemana)) idDiaSemana = [idDiaSemana];

    try {
        const allSalones = await pool.query('SELECT "idSalon", "capacidad", "modulo" FROM public."salon"');

        const ocupados = await pool.query(
            `SELECT "idSalon", "idDiaSemana", "idBloqueHorario"
             FROM public."horarioExamen"
             WHERE "idDiaSemana" = ANY($1::int[]) AND "idBloqueHorario" = ANY($2::int[])`,
            [idDiaSemana.map(Number), idBloqueHorario.map(Number)]
        );

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
        console.error('Error al consultar ocupación de salones (examen):', error);
        res.status(500).json({ message: 'Error al consultar ocupación de salones (examen)' });
    }
});

// Consultar salones disponibles para un bloque y día (solo id y capacidad)
router.get('/salones-disponibles', async (req, res) => {
    const { idDiaSemana, idBloqueHorario } = req.query;
    if (!idDiaSemana || !idBloqueHorario) {
        return res.status(400).json({ message: 'Faltan parámetros requeridos' });
    }
    try {
        const ocupados = await pool.query(
            `SELECT he."idSalon", he."idDiaSemana"
                FROM public."horarioExamen" he
            WHERE he."idDiaSemana" = ANY($1::int[]) AND he."idBloqueHorario" = ANY($2::int[])`,
            [idDiaSemana, idBloqueHorario]
        );
        const salonesOcupados = ocupados.rows.map(r => r.idSalon);

        let querySalones = 'SELECT "idSalon", capacidad FROM public."salon"';
        let params = [];
        if (salonesOcupados.length > 0) {
            const placeholders = salonesOcupados.map((_, i) => `$${i + 1}`).join(',');
            querySalones += ` WHERE "idSalon" NOT IN (${placeholders})`;
            params = salonesOcupados;
        }
        const salonesDisponibles = await pool.query(querySalones, params);
        res.json(salonesDisponibles.rows);
    } catch (error) {
        console.error('Error al consultar salones disponibles (examen):', error);
        res.status(500).json({ message: 'Error al consultar salones disponibles (examen)' });
    }
});

// Obtener todos los registros de horarioExamen o filtrar por idSalon
router.get('/', async (req, res) => {
    const { salon } = req.query;
    let query = 'SELECT "idHorarioExamen", "idBloqueHorario", "idDiaSemana", "idSalon", "idSeccion", "idProfesor" FROM public."horarioExamen"';
    let params = [];
    if (salon) {
        query += ' WHERE "idSalon" = $1';
        params.push(salon);
    }
    const result = await pool.query(query, params);
    res.json(result.rows);
});

// Obtener un registro por idHorarioExamen
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            'SELECT "idHorarioExamen", "idBloqueHorario", "idDiaSemana", "idSalon", "idSeccion", "idProfesor" FROM public."horarioExamen" WHERE "idHorarioExamen" = $1',
            [id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Registro no encontrado' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al obtener registro (examen):', error);
        res.status(500).json({ message: 'Error al obtener registro (examen)' });
    }
});

// Crear un nuevo registro de horarioExamen
router.post('/', async (req, res) => {
    const { idBloqueHorario, idDiaSemana, idSalon, idSeccion, idProfesor } = req.body;
    console.log('Datos recibidos para crear registro de examen:', req.body);
    if (!idBloqueHorario || !idDiaSemana || !idSalon || !idSeccion || !idProfesor) {
        return res.status(400).json({ message: 'Por favor, complete todos los campos requeridos.' });
    }
    try {
        // 1. Validar duplicidad exacta
        const check = await pool.query(
            `SELECT 1 FROM public."horarioExamen"
             WHERE "idBloqueHorario" = $1 AND "idDiaSemana" = $2 AND "idSalon" = $3 AND "idSeccion" = $4 AND "idProfesor" = $5`,
            [idBloqueHorario, idDiaSemana, idSalon, idSeccion, idProfesor]
        );
        if (check.rowCount > 0) {
            return res.status(409).json({ message: 'Ya existe un agendamiento de examen para este bloque, salón, sección y profesor.' });
        }

        // 2. Validar que el salón no esté ocupado en ese bloque, día y profesor
        const ocupado = await pool.query(
            `SELECT 1 FROM public."horarioExamen"
             WHERE "idBloqueHorario" = $1 AND "idDiaSemana" = $2 AND "idSalon" = $3 AND "idProfesor" = $4`,
            [idBloqueHorario, idDiaSemana, idSalon, idProfesor]
        );
        if (ocupado.rowCount > 0) {
            return res.status(409).json({
                message: 'El salón ya está ocupado en este bloque, día y profesor para un examen.'
            });
        }

        // 3. Insertar el registro si pasa las validaciones
        const result = await pool.query(
            `INSERT INTO public."horarioExamen"
            ("idBloqueHorario", "idDiaSemana", "idSalon", "idSeccion", "idProfesor")
            VALUES ($1, $2, $3, $4, $5)
            RETURNING "idHorarioExamen", "idBloqueHorario", "idDiaSemana", "idSalon", "idSeccion", "idProfesor"`,
            [idBloqueHorario, idDiaSemana, idSalon, idSeccion, idProfesor]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error al crear registro de examen:', error);
        res.status(500).json({ message: 'Ocurrió un error inesperado al crear el agendamiento de examen. Intente nuevamente.' });
    }
});

// Actualizar un registro por idHorarioExamen
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { idBloqueHorario, idDiaSemana, idSalon, idSeccion, idProfesor } = req.body;
    try {
        const result = await pool.query(
            `UPDATE public."horarioExamen"
             SET "idBloqueHorario" = $1, "idDiaSemana" = $2, "idSalon" = $3, "idSeccion" = $4, "idProfesor" = $5
             WHERE "idHorarioExamen" = $6
             RETURNING "idHorarioExamen", "idBloqueHorario", "idDiaSemana", "idSalon", "idSeccion", "idProfesor"`,
            [idBloqueHorario, idDiaSemana, idSalon, idSeccion, idProfesor, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Registro no encontrado' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al actualizar registro de examen:', error);
        res.status(500).json({ message: 'Error al actualizar registro de examen' });
    }
});

// Eliminar un registro por idHorarioExamen
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            'DELETE FROM public."horarioExamen" WHERE "idHorarioExamen" = $1 RETURNING *',
            [id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Registro no encontrado' });
        }
        res.json({ message: 'Registro eliminado', registro: result.rows[0] });
    } catch (error) {
        console.error('Error al eliminar registro de examen:', error);
        res.status(500).json({ message: 'Error al eliminar registro de examen' });
    }
});

// Obtener los horarios de examen agendados por profesor
router.get('/agendados-por-profesor/:idProfesor', async (req, res) => {
    const { idProfesor } = req.params;
    try {
        const result = await pool.query(
            `SELECT
                he."idHorarioExamen",
                he."idBloqueHorario",
                he."idDiaSemana",
                he."idSalon",
                he."idSeccion",
                he."idProfesor",
                p."nbProfesor" AS nombre_profesor,
                m."nbMateria" AS nombre_materia,
                he."idBloqueHorario" as idBloqueHorario,
                he."idDiaSemana" as idDiaSemana,
                he."idSalon" as idSalon
            FROM public."horarioExamen" he
            INNER JOIN public."profesor" p ON he."idProfesor" = p."idProfesor"
            INNER JOIN public."seccion" s ON s."idSeccion" = he."idSeccion"
            INNER JOIN public."materia" m ON s."idMateria" = m."idMateria"
            WHERE he."idProfesor" = $1`,
            [idProfesor]
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Error al consultar horarios de examen agendados por profesor:', error);
        res.status(500).json({ message: 'Error al consultar horarios de examen agendados por profesor' });
    }
});
module.exports = router;
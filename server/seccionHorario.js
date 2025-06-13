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
    const { idBloqueHorario, idDiaSemana, idSalon, idSeccion } = req.body;
    if (!idBloqueHorario || !idDiaSemana || !idSalon || !idSeccion) {
        return res.status(400).json({ message: 'Datos incompletos' });
    }
    try {
        // Validar que no exista ya ese bloque para ese salón y sección
        const check = await pool.query(
            `SELECT 1 FROM public."seccionHorario"
             WHERE "idBloqueHorario" = $1 AND "idDiaSemana" = $2 AND "idSalon" = $3 AND "idSeccion" = $4`,
            [idBloqueHorario, idDiaSemana, idSalon, idSeccion]
        );
        if (check.rowCount > 0) {
            return res.status(409).json({ message: 'Ya existe un registro para ese bloque, salón y sección' });
        }
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
        res.status(500).json({ message: 'Error al crear registro' });
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

// Consultar salones disponibles para un bloque y día (sin profesor)
// Consultar salones disponibles para un bloque y día (solo id y capacidad)
router.get('/salones-disponibles', async (req, res) => {
    const { idDiaSemana, idBloqueHorario } = req.query;
    if (!idDiaSemana || !idBloqueHorario) {
        return res.status(400).json({ message: 'Faltan parámetros requeridos' });
    }
    try {
        // Buscar los salones ocupados en ese bloque y día
        const ocupados = await pool.query(
            `SELECT "idSalon" FROM public."seccionHorario"
             WHERE "idDiaSemana" = $1 AND "idBloqueHorario" = $2`,
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




module.exports = router;
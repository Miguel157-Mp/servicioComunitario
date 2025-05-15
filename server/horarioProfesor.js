const express = require('express');
const pool = require('../database/db');
const router = express.Router();

// Obtener todos los bloques de horario de un profesor
router.get('/:idProfesor', async (req, res) => {
    console.log(`[GET] /api/horario-profesor/${req.params.idProfesor} - Solicitud recibida`);
    try {
        const { idProfesor } = req.params;
        const result = await pool.query(
            'SELECT "idHorarioProfesorPorDia", "idProfesor", "idDiaSemana", "idBloqueHorario" FROM public."horarioProfesorPorDia" WHERE "idProfesor" = $1',
            [idProfesor]
        );
        console.log(`[GET] Respuesta:`, result.rows);
        res.json(result.rows);
    } catch (error) {
        console.error(`[GET] Error:`, error);
        res.status(500).json({ message: 'Error al consultar horarios' });
    }
});

// Registrar bloques de horario para un profesor (puedes enviar varios a la vez)
router.post('/', async (req, res) => {
    console.log(`[POST] /api/horario-profesor - Solicitud recibida`, req.body);
    try {
        const { idProfesor, bloques } = req.body; // bloques: [{idDiaSemana, idBloqueHorario}]
        const inserts = [];
        for (const bloque of bloques) {
            const result = await pool.query(
                'INSERT INTO public."horarioProfesorPorDia" ("idProfesor", "idDiaSemana", "idBloqueHorario") VALUES ($1, $2, $3) RETURNING *',
                [idProfesor, bloque.idDiaSemana, bloque.idBloqueHorario]
            );
            inserts.push(result.rows[0]);
        }
        console.log(`[POST] Horarios registrados:`, inserts);
        res.status(201).json({ message: 'Horarios registrados', horarios: inserts });
    } catch (error) {
        console.error(`[POST] Error:`, error);
        res.status(500).json({ message: 'Error al registrar horarios' });
    }
});

// Modificar un bloque de horario
router.put('/:idHorario', async (req, res) => {
    console.log(`[PUT] /api/horario-profesor/${req.params.idHorario} - Solicitud recibida`, req.body);
    try {
        const { idHorario } = req.params;
        const { idDiaSemana, idBloqueHorario } = req.body;
        const result = await pool.query(
            'UPDATE public."horarioProfesorPorDia" SET "idDiaSemana" = $1, "idBloqueHorario" = $2 WHERE "idHorarioProfesorPorDia" = $3 RETURNING *',
            [idDiaSemana, idBloqueHorario, idHorario]
        );
        if (result.rows.length === 0) {
            console.log(`[PUT] No se encontró el horario con id ${idHorario}`);
            return res.status(404).json({ message: 'Horario no encontrado' });
        }
        console.log(`[PUT] Horario actualizado:`, result.rows[0]);
        res.json({ message: 'Horario actualizado', horario: result.rows[0] });
    } catch (error) {
        console.error(`[PUT] Error:`, error);
        res.status(500).json({ message: 'Error al actualizar horario' });
    }
});

// Eliminar un bloque de horario
router.delete('/:idHorario', async (req, res) => {
    console.log(`[DELETE] /api/horario-profesor/${req.params.idHorario} - Solicitud recibida`);
    try {
        const { idHorario } = req.params;
        const result = await pool.query(
            'DELETE FROM public."horarioProfesorPorDia" WHERE "idHorarioProfesorPorDia" = $1 RETURNING *',
            [idHorario]
        );
        if (result.rows.length === 0) {
            console.log(`[DELETE] No se encontró el horario con id ${idHorario}`);
            return res.status(404).json({ message: 'Horario no encontrado' });
        }
        console.log(`[DELETE] Horario eliminado:`, result.rows[0]);
        res.json({ message: 'Horario eliminado' });
    } catch (error) {
        console.error(`[DELETE] Error:`, error);
        res.status(500).json({ message: 'Error al eliminar horario' });
    }
});

module.exports = router;
const express = require('express');
const pool = require('../database/db');
const router = express.Router();

// Consultar bloques ocupados por sección y/o salón
router.get('/ocupados', async (req, res) => {
    const { seccion, salon } = req.query;
    let query = 'SELECT "idBloqueHorario", "idDiaSemana" FROM public."seccionHorario" WHERE 1=1';
    const params = [];
    if (seccion) {
        params.push(seccion);
        query += ` AND "idSeccion" = $${params.length}`;
    }
    if (salon) {
        params.push(salon);
        query += ` AND "idSalon" = $${params.length}`;
    }
    try {
        const result = await pool.query(query, params);
        res.json(result.rows);
    } catch (error) {
        console.error('Error al consultar bloques ocupados:', error);
        res.status(500).json({ message: 'Error al consultar bloques ocupados' });
    }
});

// Agendar bloques para una sección y salón, validando disponibilidad
router.post('/', async (req, res) => {
    const { idSeccion, idSalon, bloques } = req.body; // bloques: [{day, block}]
    if (!idSeccion || !idSalon || !Array.isArray(bloques) || bloques.length === 0) {
        return res.status(400).json({ message: 'Datos incompletos' });
    }

    // Validar que los bloques no estén ocupados por la sección o el salón
    try {
        for (const b of bloques) {
            const check = await pool.query(
                `SELECT 1 FROM public."seccionHorario"
                 WHERE ("idSeccion" = $1 OR "idSalon" = $2)
                 AND "idDiaSemana" = $3 AND "idBloqueHorario" = $4`,
                [idSeccion, idSalon, b.day, b.block]
            );
            if (check.rowCount > 0) {
                return res.status(409).json({ message: `El bloque Día ${b.day}, Bloque ${b.block} ya está ocupado` });
            }
        }
        // Insertar los bloques
        const inserts = [];
        for (const b of bloques) {
            const result = await pool.query(
                `INSERT INTO public."seccionHorario"
                ("idBloqueHorario", "idDiaSemana", "idSalon", "idSeccion")
                VALUES ($1, $2, $3, $4) RETURNING *`,
                [b.block, b.day, idSalon, idSeccion]
            );
            inserts.push(result.rows[0]);
        }
        res.status(201).json({ message: 'Agendamiento guardado', registros: inserts });
    } catch (error) {
        console.error('Error al agendar:', error);
        res.status(500).json({ message: 'Error al agendar' });
    }
});

module.exports = router;
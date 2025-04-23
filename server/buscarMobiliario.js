const express = require('express');
const pool = require('../database/db');
const router = express.Router();

// Ruta para buscar mobiliario
router.get('/', async (req, res) => {
    try {
        const query = req.query.query || '';
        const result = await pool.query(
            'SELECT "idTipoDeMobiliario", "nbMobiliario" FROM "public"."TipoDeMobiliario" WHERE "nbMobiliario" ILIKE $1',
            [`%${query}%`]
        );
        
        res.json(result.rows);
    } catch (error) {
        console.error('Error al buscar mobiliario:', error);
        res.status(500).json({ error: 'Error al buscar mobiliario' });
    }
});

module.exports = router;











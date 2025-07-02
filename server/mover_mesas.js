const express = require('express');
const pool = require('../database/db');
const router = express.Router();

router.get('/salones/', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT
                li."idLugarInventario",
                li.cantidad,
                tm."nbMobiliario",
                li."idSalon"
            FROM
                public."lugarInventario" li
            INNER JOIN
                public."tipoDeMobiliario" tm ON li."idTipoDeMobiliario" = tm."idTipoDeMobiliario"
            WHERE
                li."idTipoDeMobiliario" = 2
        `);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener las sillas');
    }
});

module.exports = router;
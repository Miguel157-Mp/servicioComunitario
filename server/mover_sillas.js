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
        console.log('Sillas con nombre:', result.rows);
        res.json(result.rows); // Devuelve los datos como JSON
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener las sillas con el nombre');
    }
});

module.exports = router;
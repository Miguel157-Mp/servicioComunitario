const express = require('express');
const pool = require('../database/db');

const router = express.Router();

// Ruta para buscar materias por nombre o código
router.get('/', async (req, res) => {
    const { query } = req.query;
    try {
        let sql = `
            SELECT "idMateria", "nbMateria", "codigoMateria"
            FROM "public"."materia"
        `;
        let params = [];
        if (query && query.trim() !== "") {
            sql += ` WHERE "nbMateria" ILIKE $1 OR CAST("codigoMateria" AS TEXT) ILIKE $1`;
            params.push(`%${query}%`);
        }
        sql += ` ORDER BY "nbMateria" ASC LIMIT 10;`;

        const result = await pool.query(sql, params);
        res.json(result.rows);
    } catch (error) {
        console.error("Error al buscar materias:", error);
        res.status(500).json({ error: "Error al buscar materias" });
    }
});

module.exports = router;
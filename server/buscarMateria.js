const express = require('express');
const pool = require('../database/db'); // Importar la conexión a la base de datos

const router = express.Router();

// Ruta para buscar materias
router.get('/', async (req, res) => {
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ error: "Falta el parámetro de búsqueda" });
    }

    try {
        const result = await pool.query(`
            SELECT "idMateria", "nbMateria", "codigoMateria"
            FROM "public"."materia"
            WHERE "nbMateria" ILIKE $1
            LIMIT 10;
        `, [`%${query}%`]);

        res.json(result.rows);
    } catch (error) {
        console.error("Error al buscar materias:", error);
        res.status(500).json({ error: "Error al buscar materias" });
    }
});

module.exports = router;
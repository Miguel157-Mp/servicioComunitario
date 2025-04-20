const express = require('express');
const pool = require('../database/db');
const router = express.Router();

router.get('/', async (req, res) => {
    const { query = '' } = req.query; // Añade valor por defecto ''
    console.log("query: ", query);
    try {
        const result = await pool.query(`
            SELECT 
                s."idSeccion",
                s.seccion,
                s."idProfesor",
                s."idMateria", 
                s."cantEstudiantes", 
                p."nbProfesor" AS nombreProfesor, 
                m."nbMateria" AS nombreMateria
            FROM "public"."seccion" s
            INNER JOIN "public"."profesor" p ON s."idProfesor" = p."idProfesor"
            INNER JOIN "public"."materia" m ON s."idMateria" = m."idMateria"
            WHERE 
                p."nbProfesor" ILIKE $1 or
                m."nbMateria" ILIKE $1 or
                s.seccion ILIKE $1
            LIMIT 10;
        `, [`%${query}%`]);
        
        res.json(result.rows);
    } catch (error) {
        console.error("Error al buscar secciones:", error);
        res.status(500).json({ error: "Error al buscar secciones" });
    }
});

module.exports = router;
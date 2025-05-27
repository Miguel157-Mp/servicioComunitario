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
router.get('/por-profesor/:idProfesor', async (req, res) => {
    const { idProfesor } = req.params;
    try {
        const result = await pool.query(
            `SELECT
                s."idSeccion",
                s.seccion,
                s."idProfesor",
                s."idMateria",
                s."cantEstudiantes",
                
                m."nbMateria" AS nombreMateria
            FROM
                public.seccion s
            INNER JOIN
                public.materia m ON s."idMateria" = m."idMateria"
             WHERE "idProfesor" = $1`,
            [idProfesor]
        );
        res.json(result.rows);
    } catch (error) {
        console.error("Error al buscar secciones por profesor:", error);
        res.status(500).json({ error: "Error al buscar secciones por profesor" });
    }
});

// Buscar varias secciones por sus IDs
router.post('/por-secciones', async (req, res) => {
    const { ids } = req.body; // Espera { ids: [1,2,3] }
    if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({ error: "Debes enviar un arreglo de IDs de secciones" });
    }
    try {
        const placeholders = ids.map((_, i) => `$${i + 1}`).join(',');
        const result = await pool.query(
            `SELECT
                s."idSeccion",
                s.seccion,
                s."idProfesor",
                s."idMateria",
                s."cantEstudiantes",
                p."nbProfesor" AS nombreProfesor,
                m."nbMateria" AS nombreMateria
            FROM
                public.seccion s
            INNER JOIN
                public.profesor p ON s."idProfesor" = p."idProfesor"
            INNER JOIN
                public.materia m ON s."idMateria" = m."idMateria"
            WHERE s."idSeccion" IN (${placeholders})`,
            ids
        );
        res.json(result.rows);
    } catch (error) {
        console.error("Error al buscar secciones por IDs:", error);
        res.status(500).json({ error: "Error al buscar secciones por IDs" });
    }
});
module.exports = router;
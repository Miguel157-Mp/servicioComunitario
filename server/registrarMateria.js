const express = require('express');
const pool = require('../database/db');
const router = express.Router();

router.post('/', async (req, res) => {
    const { nbMateria, codigoMateria } = req.body;
    if (!nbMateria || nbMateria.length < 3) {
        return res.status(400).json({ error: "El nombre de la materia es obligatorio y debe tener al menos 3 caracteres." });
    }
    if (!codigoMateria || codigoMateria.length < 2) {
        return res.status(400).json({ error: "El código de la materia es obligatorio y debe tener al menos 2 caracteres." });
    }
    try {
        // Verifica si ya existe la materia por nombre o código (insensible a mayúsculas)
        const existe = await pool.query(
            'SELECT "idMateria" FROM public.materia WHERE LOWER("nbMateria") = LOWER($1) OR LOWER(CAST("codigoMateria" AS TEXT)) = LOWER($2)',
            [nbMateria, codigoMateria]
        );
        if (existe.rows.length > 0) {
            return res.status(409).json({ error: "La materia o el código ya existen." });
        }
        // Inserta la nueva materia (usa comillas dobles en ambas columnas)
        const result = await pool.query(
            'INSERT INTO public.materia ("nbMateria", "codigoMateria") VALUES ($1, $2) RETURNING "idMateria"',
            [nbMateria, codigoMateria]
        );
        res.status(201).json({ idMateria: result.rows[0].idMateria });
    } catch (error) {
        console.error("Error al registrar materia:", error);
        res.status(500).json({ error: "Error al registrar la materia." });
    }
});

module.exports = router;
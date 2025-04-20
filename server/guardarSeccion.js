const express = require('express');
const pool = require('../database/db'); // Importar la conexión a la base de datos

const router = express.Router();

// Ruta para guardar una nueva sección
router.post('/', async (req, res) => {
    const { seccion, idProfesor, idMateria, cantidadEstudiantes } = req.body;

    if (!seccion || !idProfesor || !idMateria || !cantidadEstudiantes) {
        return res.status(400).json({ error: "Faltan datos para registrar la sección" });
    }

    try {

        console.log('Ejecutando consulta SQL para guardar sección:', { seccion, idProfesor, idMateria, cantidadEstudiantes });
        const result = await pool.query(`
             INSERT INTO public.seccion (seccion, "idProfesor", "idMateria", "cantEstudiantes")
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `, [seccion, idProfesor, idMateria, cantidadEstudiantes]);
        res.status(201).json({ message: "Sección registrada exitosamente", seccion: result.rows[0] });
    } catch (error) {
        console.error("Error al guardar la sección:", error);
        res.status(500).json({ error: "Error al guardar la sección", details: error.message });
    }
});

module.exports = router;
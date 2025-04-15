const express = require('express');
const pool = require('../database/db'); // Asegúrate de que este archivo esté configurado correctamente

const router = express.Router();

// Ruta para insertar un profesor
router.post('/', async (req, res) => {
    const { nombreApellido, cedula, email, telefono } = req.body;

    try {
        console.log('Datos recibidos:', { nombreApellido, cedula, email, telefono });

        // Inserta el profesor
        const query = `
            INSERT INTO "public"."profesor" (
                "nbProfesor", cedula, email 
            )
            VALUES ($1, $2, $3)
            RETURNING *;
        `;
        const values = [nombreApellido, cedula, email];

        console.log('Consulta generada:', query);
        console.log('Valores:', values);

        const result = await pool.query(query, values);
        console.log('Resultado de la inserción:', result.rows);

        res.status(201).json({
            message: "Profesor registrado exitosamente",
            profesor: result.rows[0],
        });
    } catch (error) {
        console.error('Error al registrar el profesor:', error.message, error.stack);
        res.status(500).send(`Error al registrar el profesor: ${error.message}`);
    }
});

// Ruta para obtener todos los profesores
router.get('/', async (req, res) => {
    try {
        const query = `SELECT * FROM "public"."profesor" ORDER BY "nbProfesor" ASC;`;
        const result = await pool.query(query);

        console.log('Profesores obtenidos:', result.rows); // Verifica si hay resultados
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error al obtener los profesores:', error.message, error.stack);
        res.status(500).send(`Error al obtener los profesores: ${error.message}`);
    }
});

module.exports = router;
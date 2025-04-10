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
                "nbProfesor", cedula, email, "Telf"
            )
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `;
        const values = [nombreApellido, cedula, email, telefono];

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

module.exports = router;
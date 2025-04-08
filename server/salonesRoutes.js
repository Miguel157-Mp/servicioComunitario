const express = require('express');
const pool = require('../database/db'); // Asegúrate de que este archivo esté configurado correctamente



const router = express.Router();

// Ruta para obtener la lista de salones
router.get('/list', async (req, res) => {
    try {
        const result = await pool.query('SELECT "idSalon", "modulo" FROM "public"."salon"'); // Selecciona solo los campos necesarios
        res.json(result.rows); // Devuelve los datos como JSON
    } catch (error) {
        console.error('Error al obtener los salones:', error.message, error.stack);
        res.status(500).send(`Error al obtener los salones: ${error.message}`);
    }
});


module.exports = router;
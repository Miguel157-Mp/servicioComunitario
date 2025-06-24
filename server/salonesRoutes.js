const express = require('express');
const pool = require('../database/db'); // Asegúrate de que este archivo esté configurado correctamente




const router = express.Router();

// Ruta para obtener la lista de salones
router.get('/list', async (req, res) => {
    try {
        const result = await pool.query('SELECT "idSalon", "capacidad" ,"modulo" FROM "public"."salon"'); // Selecciona solo los campos necesarios
        console.log('Resultado de la consulta:', result.rows); // Muestra el resultado en la consola
        res.json(result.rows);
         // Devuelve los datos como JSON
    } catch (error) {
        console.error('Error al obtener los salones:', error.message, error.stack);
        res.status(500).send(`Error al obtener los salones: ${error.message}`);
    }
});

// Ruta para obtener los pisos distintos
router.get('/pisos', async (req, res) => {
    try {
        const result = await pool.query('SELECT DISTINCT piso FROM public.salon ORDER BY piso');
        // Devuelve solo el array de pisos
        res.json(result.rows.map(row => row.piso));
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los pisos' });
    }
});

// Ruta para obtener los módulos distintos
router.get('/modulos', async (req, res) => {
    try {
        const result = await pool.query('SELECT DISTINCT modulo FROM public.salon ORDER BY modulo');
        // Devuelve solo el array de módulos
        res.json(result.rows.map(row => row.modulo));
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los módulos' });
    }
});


module.exports = router;
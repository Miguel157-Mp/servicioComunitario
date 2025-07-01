const express = require('express');
const pool = require('../database/db');
const router = express.Router();

// Actualizar mobiliario
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { cantidad, idTipoDeMobiliario, idSalon } = req.body;
    console.log('PUT /mobiliario/:id');
    console.log('Params:', req.params);
    console.log('Body:', req.body);
    try {
        const result = await pool.query(
            'UPDATE public."lugarInventario" SET cantidad = $1, "idTipoDeMobiliario" = $2, "idSalon" = $3 WHERE "idLugarInventario" = $4',
            [cantidad, idTipoDeMobiliario, idSalon, id]
        );
        console.log('DB result:', result.rowCount);
        res.json({ message: 'Mobiliario actualizado' });
    } catch (error) {
        console.error('Error al actualizar mobiliario:', error);
        res.status(500).json({ error: 'Error al actualizar mobiliario' });
    }
});

// Obtener tipos de mobiliario
router.get('/tipos', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT "idTipoDeMobiliario", "nbMobiliario", descripcion FROM public."tipoDeMobiliario"'
        );
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener tipos de mobiliario' });
    }
});


// Eliminar mobiliario
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    console.log('DELETE /mobiliario/:id');
    console.log('Params:', req.params);
    try {
        const result = await pool.query('DELETE FROM public."lugarInventario" WHERE "idLugarInventario" = $1', [id]);
        console.log('DB result:', result.rowCount);
        res.json({ message: 'Mobiliario eliminado' });
    } catch (error) {
        console.error('Error al eliminar mobiliario:', error);
        res.status(500).json({ error: 'Error al eliminar mobiliario' });
    }
});

module.exports = router;
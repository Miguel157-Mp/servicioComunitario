const express = require('express');
const pool = require('../database/db');
const router = express.Router();

// Actualizar mobiliario
router.put('/mobiliario/:id', async (req, res) => {
    const { id } = req.params;
    const { cantidad, idTipoDeMobiliario, idSalon } = req.body;
    try {
        await pool.query(
            'UPDATE public."lugarInventario" SET cantidad = $1, "idTipoDeMobiliario" = $2, "idSalon" = $3 WHERE "idLugarInventario" = $4',
            [cantidad, idTipoDeMobiliario, idSalon, id]
        );
        res.json({ message: 'Mobiliario actualizado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar mobiliario' });
    }
});

// Eliminar mobiliario
router.delete('/mobiliario/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM public."lugarInventario" WHERE "idLugarInventario" = $1', [id]);
        res.json({ message: 'Mobiliario eliminado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar mobiliario' });
    }
});

module.exports = router;
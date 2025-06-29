const express = require('express');
const pool = require('../database/db');
const router = express.Router();

// Insertar infraestructura en un salón
router.post('/', async (req, res) => {
    const { cantidad, idElementoDeInfraestructura, idSalon, idEstadoInfraestructura, descripcion } = req.body;
    try {
        await pool.query(
            'INSERT INTO public."infraestructuraSalon" (cantidad, "idElementoDeInfraestructura", "idSalon", "idEstadoInfraestructura", descripcion) VALUES ($1, $2, $3, $4, $5)',
            [cantidad, idElementoDeInfraestructura, idSalon, idEstadoInfraestructura, descripcion]
        );
        res.status(201).json({ message: 'Infraestructura registrada correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar infraestructura' });
    }
});

// Actualizar infraestructura
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { cantidad, idElementoDeInfraestructura, idSalon, idEstadoInfraestructura, descripcion } = req.body;
    try {
        await pool.query(
            'UPDATE public."infraestructuraSalon" SET cantidad = $1, "idElementoDeInfraestructura" = $2, "idSalon" = $3, "idEstadoInfraestructura" = $4, descripcion = $5 WHERE "IdInfraestructuraSalon" = $6',
            [cantidad, idElementoDeInfraestructura, idSalon, idEstadoInfraestructura, descripcion, id]
        );
        res.json({ message: 'Infraestructura actualizada' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar infraestructura' });
    }
});

// Eliminar infraestructura
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM public."infraestructuraSalon" WHERE "IdInfraestructuraSalon" = $1', [id]);
        res.json({ message: 'Infraestructura eliminada' });
    } catch (error) {
        console.error('Error al eliminar infraestructura:', error); // <-- Esto te dará el error real en consola
        res.status(500).json({ error: 'Error al eliminar infraestructura' });
    }
});

module.exports = router;
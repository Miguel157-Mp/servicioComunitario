const express = require('express');
const pool = require('../database/db'); // Asegúrate de que este archivo esté configurado correctamente

const router = express.Router();

router.put('/:id', async (req, res) => {
    const { id } = req.params; // Captura el ID del profesor desde la URL
    const { nombreApellido, telefono, cedula, email } = req.body; // Captura los datos enviados en el cuerpo de la solicitud

    try {
        // Actualiza el profesor en la base de datos
        const result = await pool.query(
            'UPDATE profesor SET nbProfesor = ?, Telf = ?, cedula = ?, email = ? WHERE id = ?',
            [nombreApellido, telefono, cedula, email, id]
        );

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Profesor actualizado exitosamente' });
        } else {
            res.status(404).json({ message: 'Profesor no encontrado' });
        }
    } catch (error) {
        console.error('Error al actualizar el profesor:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

module.exports = router;

const express = require('express');
const pool = require('../database/db');

const router = express.Router();

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nombreApellido, telefono, cedula, email } = req.body;

    // Log de la solicitud entrante
    console.log(`[${new Date().toISOString()}] Intento de actualización - Profesor ID: ${id}`);
    console.log('Datos recibidos:', { nombreApellido, telefono, cedula, email });

    try {
        const result = await pool.query(
            `UPDATE "profesor" 
             SET "nbProfesor" = $1,
                 "cedula" = $2, 
                 "email" = $3 
             WHERE "idProfesor" = $4
             RETURNING *;`,
            [nombreApellido, cedula, email, id]
        );

        if (result.rowCount > 0) {
            console.log(`[${new Date().toISOString()}] Actualización exitosa - Profesor ID: ${id}`);
            res.status(200).json({ 
                message: 'Profesor actualizado exitosamente',
                profesor: result.rows[0] 
            });
        } else {
            console.warn(`[${new Date().toISOString()}] Profesor no encontrado - ID: ${id}`);
            res.status(404).json({ message: 'Profesor no encontrado' });
        }
    } catch (error) {
        // Log detallado del error
        console.error(`[${new Date().toISOString()}] Error al actualizar profesor ID: ${id}`);
        console.error('Error completo:', {
            message: error.message,
            stack: error.stack,
            query: {
                text: `UPDATE profesor SET nbProfesor = $1, Telf = $2, cedula = $3, email = $4 WHERE idProfesor = $5`,
                values: [nombreApellido, telefono, cedula, email, id]
            }
        });
        
        res.status(500).json({ 
            message: 'Error interno del servidor',
            error: process.env.NODE_ENV === 'development' ? error.message : 'Ocurrió un error' 
        });
    }
});

module.exports = router;
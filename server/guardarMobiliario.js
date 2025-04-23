const express = require('express');
const pool = require('../database/db');
const router = express.Router();

// Ruta para guardar mobiliario
router.post('/', async (req, res) => {
    try {
        const mobiliarios = req.body; // Array de mobiliarios [{ idSalon, idTipoDeMobiliario, cantidad }]
        console.log('Datos recibidos:', mobiliarios);

        if (!Array.isArray(mobiliarios) || mobiliarios.length === 0) {
            return res.status(400).json({ error: 'No se enviaron datos para registrar mobiliario' });
        }

        for (const mobiliario of mobiliarios) {
            const { idSalon, idTipoDeMobiliario, cantidad } = mobiliario;

            if (!idSalon || !idTipoDeMobiliario || !cantidad) {
                console.error('Datos incompletos:', mobiliario);
                return res.status(400).json({ error: 'Datos incompletos para registrar mobiliario' });
            }

            console.log(`Procesando mobiliario: idSalon=${idSalon}, idTipoDeMobiliario=${idTipoDeMobiliario}, cantidad=${cantidad}`);

            // Verificar si ya existe un registro con el mismo idTipoDeMobiliario y idSalon
            const existingRecord = await pool.query(
                'SELECT "cantidad" FROM public."lugarInventario" l WHERE l."idSalon" = $1 AND l."idTipodeMobiliario" = $2',
                [idSalon, idTipoDeMobiliario]
            );
            console.log('Respuesta de SELECT:', existingRecord.rows);

            if (existingRecord.rows.length > 0) {
                // Si existe, actualizar la cantidad
                const nuevaCantidad = parseInt(existingRecord.rows[0].cantidad) + parseInt(cantidad);
                console.log(`Actualizando cantidad: ${existingRecord.rows[0].cantidad} + ${cantidad} = ${nuevaCantidad}`);

                const updateResult = await pool.query(
                    'UPDATE public."lugarInventario" SET "cantidad" = $1 WHERE "idSalon" = $2 AND "idTipodeMobiliario" = $3;',
                    [nuevaCantidad, idSalon, idTipoDeMobiliario]
                );
                console.log('Respuesta de UPDATE:', updateResult);
                console.log(`Cantidad actualizada para idSalon=${idSalon}, idTipoDeMobiliario=${idTipoDeMobiliario}`);
            } else {
                // Si no existe, insertar un nuevo registro
                console.log(`Insertando nuevo registro para idSalon=${idSalon}, idTipoDeMobiliario=${idTipoDeMobiliario}, cantidad=${cantidad}`);

                const insertResult = await pool.query(
                    'INSERT INTO public."lugarInventario" ("idSalon", "idTipodeMobiliario", "cantidad") VALUES ($1, $2, $3);',
                    [idSalon, idTipoDeMobiliario, cantidad]
                );
                console.log('Respuesta de INSERT:', insertResult);
                console.log(`Nuevo registro insertado para idSalon=${idSalon}, idTipoDeMobiliario=${idTipoDeMobiliario}`);
            }
        }

        res.status(200).json({ success: true, message: 'Mobiliario registrado exitosamente' });
    } catch (error) {
        console.error('Error al registrar mobiliario:', error);
        res.status(500).json({ error: 'Error al registrar mobiliario', details: error.message });
    }
});

module.exports = router;
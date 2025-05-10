//este archivo mueve el mobiliario de los pupitres de un salon a otro

const express = require('express');
const pool = require('../database/db');
const router = express.Router();

router.post('/', async (req, res, next) => {
    const { origen, destino, cantidad } = req.body;
    const cantidadTraspasar = parseInt(cantidad, 10);

    if (!origen || !destino || !cantidad || isNaN(cantidadTraspasar) || cantidadTraspasar <= 0) {
        return res.status(400).json({ success: false, error: 'Datos incompletos o inválidos' });
    }

    if (origen === destino) {
        return res.status(400).json({ success: false, error: 'El salón de origen y destino deben ser diferentes' });
    }

    try {
        await pool.query('BEGIN');

        // 1. Consultar la cantidad (current quantity and capacity limit) of the destination salon
        const destinoResult = await pool.query(
            'SELECT cantidad FROM public."lugarInventario" WHERE "idSalon" = $1 AND "idTipodeMobiliario" = 1',
            [destino]
        );

        if (destinoResult.rows.length === 0) {
            await pool.query('ROLLBACK');
            return res.status(404).json({ success: false, error: 'El salón de destino no existe' });
        }

        const cantidadDestino = destinoResult.rows[0].cantidad || 0;

        // 2. Consultar la cantidad (current quantity) of the origin salon
        const origenResult = await pool.query(
            'SELECT cantidad FROM public."lugarInventario" WHERE "idSalon" = $1 AND "idTipodeMobiliario" = 1',
            [origen]
        );


        if (origenResult.rows.length === 0) {
            await pool.query('ROLLBACK');
            return res.status(404).json({ success: false, error: 'El salón de origen no existe' });
        }

        const cantidadOrigenActual = origenResult.rows[0].cantidad || 0;
        const nuevaCantidadOrigen = cantidadOrigenActual - cantidadTraspasar;

        // 3. Verificar si la cantidad a traspasar no excede la cantidad in origin
        if (cantidadTraspasar > cantidadOrigenActual) {
            await pool.query('ROLLBACK');
            return res.status(400).json({ success: false, error: 'La cantidad a traspasar excede la cantidad disponible en el salón de origen' });
        }

        // 4. Calcular the new quantity in the destination salon
        const nuevaCantidadDestino = cantidadDestino + cantidadTraspasar;

       

        // 6. Update the quantity in the destination salon (add)
        await pool.query(
            'UPDATE public."lugarInventario" SET cantidad = $1 WHERE "idSalon" = $2 AND "idTipodeMobiliario" = 1',
            [nuevaCantidadDestino, destino]
        );

        // 7. Update the quantity in the origin salon (subtract)
        await pool.query(
            'UPDATE public."lugarInventario" SET cantidad = $1 WHERE "idSalon" = $2 AND "idTipodeMobiliario" = 1',
            [nuevaCantidadOrigen, origen]
        );

        // Finalize the transaction
        await pool.query('COMMIT');

        res.json({ success: true, message: 'Traspaso realizado con éxito' }); // Successful JSON response

    } catch (error) {
        // If an error occurs, rollback the transaction
        await pool.query('ROLLBACK');
        console.error('Error al realizar el traspaso:', error.message, error.stack);
        res.status(500).json({ success: false, error: error.message }); // Error JSON response
    }
});

module.exports = router;
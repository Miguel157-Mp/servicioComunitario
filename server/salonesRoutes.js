const express = require('express');
const router = express.Router();

// Ejemplo de ruta para obtener salones
router.get('/', (req, res) => {
    res.send('Lista de salones');
});

// Ejemplo de ruta para agregar un salón
router.post('/add', (req, res) => {
    const { nombre, capacidad } = req.body;
    if (!nombre || !capacidad) {
        return res.status(400).send('Datos incompletos');
    }
    // Aquí iría la lógica para agregar el salón a la base de datos
    res.send('Salón agregado');
});

module.exports = router;

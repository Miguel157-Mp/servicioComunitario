const express = require('express');
const pool = require('../database/db'); // Asegúrate de que este archivo esté configurado correctamente

const router = express.Router();

// Ruta para insertar un profesor
router.post('/', async (req, res) => {
    const { nbprofesor, cedula, email, telefono } = req.body;

    try {
        console.log('Datos recibidos:', { nbprofesor, cedula, email, telefono });

        // Verifica la base de datos activa
        const dbCheck = await pool.query('SELECT current_database();');
        console.log('Base de datos activa:', dbCheck.rows[0].current_database);

        // Verifica el esquema y la tabla
        const schemaCheck = await pool.query(`
            SELECT schema_name
            FROM information_schema.schemata
            WHERE schema_name = 'public';
        `);
        console.log('Esquema "public" existe:', schemaCheck.rowCount > 0);

        const tableCheck = await pool.query(`
            SELECT table_schema, table_name
            FROM information_schema.tables
            WHERE table_name = 'profesor' AND table_schema = 'public';
        `);
        console.log('Tabla "public.profesor" existe:', tableCheck.rowCount > 0);

        if (tableCheck.rowCount === 0) {
            console.error('La tabla "public.profesor" no existe.');
            return res.status(400).send('La tabla "public.profesor" no existe.');
        }

        // Inserta el profesor
        const query = `
            INSERT INTO "public"."profesor" (
                "nbProfesor", cedula, email, "Telf"
            )
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `;
        const values = [nbprofesor, cedula, email, telefono];

        console.log('Consulta generada:', query);
        console.log('Valores:', values);

        const result = await pool.query(query, values);
        console.log('Resultado de la inserción:', result.rows);

        res.status(201).json({
            message: "Profesor registrado exitosamente",
            profesor: result.rows[0],
        });
    } catch (error) {
        console.error('Error al registrar el profesor:', error.message, error.stack);
        res.status(500).send(`Error al registrar el profesor: ${error.message}`);
    }
});

module.exports = router;
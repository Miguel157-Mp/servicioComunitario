const express = require('express');
const pool = require('../database/db'); // Asegúrate de que este archivo esté configurado correctamente




const router = express.Router();

// Ruta para obtener la lista de salones
router.get('/list', async (req, res) => {
    try {
        const result = await pool.query('SELECT "idSalon", "capacidad" ,"modulo" FROM "public"."salon"'); // Selecciona solo los campos necesarios
        
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

// Ruta para registrar un nuevo salón
router.post('/', async (req, res) => {
    const { idSalon, piso, modulo, capacidad, status, tipoDeSalon } = req.body;
    try {
        await pool.query(
            `INSERT INTO public.salon("idSalon", piso, modulo, capacidad, status, "tipoDeSalon")
             VALUES ($1, $2, $3, $4, $5, $6)`,
            [idSalon, piso, modulo, capacidad, status, tipoDeSalon]
        );
        res.status(201).json({ message: 'Salón registrado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar el salón' });
    }
});

// Ruta para obtener solo los idSalon
router.get('/ids', async (req, res) => {
    try {
        const result = await pool.query('SELECT "idSalon" FROM public.salon ORDER BY "idSalon" ASC');
        res.json(result.rows.map(row => row.idSalon));
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los IDs de los salones' });
    }
});

// Ruta para obtener los tipos de salón
router.get('/tipos', async (req, res) => {
    try {
        const result = await pool.query('SELECT "idTipoDeSalon", "nbTipoDeSalon" FROM public."tipoDeSalon" ORDER BY "nbTipoDeSalon" ASC');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los tipos de salón' });
    }
});

// Crear nuevo tipo de salón
router.post('/tipos', async (req, res) => {
    const { nbTipoDeSalon } = req.body;
    try {
        await pool.query(
            'INSERT INTO public."tipoDeSalon" ("nbTipoDeSalon") VALUES ($1)',
            [nbTipoDeSalon]
        );
        res.status(201).json({ message: 'Tipo de salón creado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear tipo de salón' });
    }
});

// Editar tipo de salón
router.put('/tipos/:id', async (req, res) => {
    const { id } = req.params;
    const { nbTipoDeSalon } = req.body;
    try {
        await pool.query(
            'UPDATE public."tipoDeSalon" SET "nbTipoDeSalon" = $1 WHERE "idTipoDeSalon" = $2',
            [nbTipoDeSalon, id]
        );
        res.json({ message: 'Tipo de salón actualizado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar tipo de salón' });
    }
});

// Nueva ruta para obtener detalles completos de salones
router.get('/detalles', async (req, res) => {
    try {
        // Toma los filtros del query string
        const { piso, modulo } = req.query;
        let where = [];
        let values = [];
        let idx = 1;

        if (piso) {
            where.push(`s.piso = $${idx++}`);
            values.push(piso);
        }
        if (modulo) {
            where.push(`s.modulo = $${idx++}`);
            values.push(modulo);
        }

        const whereClause = where.length ? `WHERE ${where.join(' AND ')}` : '';

        const query = `
        SELECT 
            s."idSalon",
            s.piso,
            s.modulo,
            s.capacidad,
            s.status,
            ts."nbTipoDeSalon" AS tipo_salon,
            (
                SELECT JSON_AGG(JSON_BUILD_OBJECT(
                    'IdInfraestructuraSalon', infs."IdInfraestructuraSalon",
                    'elemento', ei."nbElementoDeInfraestructura",
                    'cantidad', infs.cantidad,
                    'estado', est."nbEstado"
                ))
                FROM public."infraestructuraSalon" infs
                LEFT JOIN public."elementoDeInfraestructura" ei 
                    ON infs."idElementoDeInfraestructura" = ei."idElementoDeInfraestructura"
                LEFT JOIN public."estadoInfraestructura" est 
                    ON infs."idEstadoInfraestructura" = est."idEstadoInfraestructura"
                WHERE infs."idSalon" = s."idSalon"
            ) AS infraestructura,
            (
                SELECT JSON_AGG(JSON_BUILD_OBJECT(
                    'idLugarInventario', inv."idLugarInventario",
                    'mobiliario', tm."nbMobiliario",
                    'cantidad', inv.cantidad
                ))
                FROM public."lugarInventario" inv
                LEFT JOIN public."tipoDeMobiliario" tm 
                    ON inv."idTipoDeMobiliario" = tm."idTipoDeMobiliario"
                WHERE inv."idSalon" = s."idSalon"
            ) AS mobiliario
        FROM public."salon" s
        INNER JOIN public."tipoDeSalon" ts ON s."idTipoDeSalon" = ts."idTipoDeSalon"
        ${whereClause};
        `;

        const result = await pool.query(query, values);
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener detalles de salones:', error.message, error.stack);
        res.status(500).json({ error: 'Error al obtener detalles de salones' });
    }
});

module.exports = router;
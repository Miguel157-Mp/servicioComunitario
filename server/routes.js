const express = require('express');
const pool = require('../database/db'); // Importar el objeto pool
const path = require('path');
const router = express.Router();

// Middleware para proteger rutas privadas
function requireLogin(req, res, next) {
    if (!req.session.usuario) {
        return res.redirect('/index.html');
    }
    next();
}

// Ruta principal protegida
router.get('/', requireLogin, (req, res) => {
    res.sendFile(path.join(__dirname, '../dashboard.html'));
});

// Ruta para el login
router.post('/submit', async (req, res, next) => {
    const { usuario, clave } = req.body;

    if (!usuario || !clave) {
        console.error('Datos incompletos en /submit:', req.body);
              // Enviar JSON con error y campos faltantes 
        return res.status(400).json({
            success: false,
            message: 'Por favor, completa todos los campos.',
            fields: ['usuario', 'clave'] 
        });

    }

    try {
        const result = await pool.query('SELECT * FROM "public"."loginUsuario" WHERE usuario = $1 AND clave = $2', [usuario, clave]);

        if (result.rows.length > 0) {
            req.session.usuario = {
                id: result.rows[0].id,
                nombre: result.rows[0].nombre,
                usuario: result.rows[0].usuario
            };
            res.redirect('/dashboard.html');
        } else {
console.warn('Credenciales incorrectas para usuario:', usuario);
            res.status(401).json({
                success: false,
                message: 'Credenciales incorrectas. Por favor, inténtalo de nuevo.'
            });
        }
    } catch (error) {
        console.error('Error al ejecutar la consulta en /submit:', error.message, error.stack); // Log detallado del error
        res.status(500).json({
            success: false,
            message: 'Error al procesar la solicitud. Por favor, inténtalo más tarde.'
        });
        next(error);
    }
});

// Ruta para obtener datos del usuario
router.get('/usuario', requireLogin, (req, res) => {
    if (req.session.usuario) {
        res.json(req.session.usuario);
    } else {
        res.status(401).json({ error: 'No autorizado' });
    }
});

// Ruta para cerrar sesión
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
console.error('Error al cerrar sesión:', err.message, err.stack); // Log detallado
            return res.status(500).send('Error al cerrar sesión');
        }

        res.redirect('/index.html');
    });
});

// Ruta para el registro de usuarios
router.post('/register', async (req, res, next) => {
    const { usuario, clave, nombre, cedula } = req.body;

    if (!usuario || !clave || !nombre || !cedula) {
        console.error('Datos incompletos en /register:', req.body);
        return res.status(400).send('Datos incompletos');
    }

    try {
console.log('Ejecutando consulta SQL para /register:', { usuario, clave, nombre, cedula });
        await pool.query('INSERT INTO "public"."loginUsuario" (nombre, cedula, usuario, clave) VALUES ($1, $2, $3, $4)', [nombre, cedula, usuario, clave]);
        res.redirect('/index.html');
    } catch (error) {
console.error('Error al registrar usuario en /register:', error.message, error.stack);
        next(error);
    }
});





//ruta para buscar profesores
router.get('/buscarProfesor', async (req, res) => {
    const { query } = req.query;
    if (!query) {
        return res.status(400).json({ error: "Falta el parámetro de búsqueda" });
    }
    try {
        const result = await pool.query(
            `SELECT "idProfesor", "nbProfesor", cedula, email, "Telf" 
             FROM "public"."profesor" 
             WHERE "nbProfesor" ILIKE $1 
                OR COALESCE(cedula::text, '') ILIKE $1 
                OR COALESCE("Telf", '') ILIKE $1 
                OR COALESCE(email, '') ILIKE $1
             LIMIT 10`,
            [`%${query}%`]
        );
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: "Error al buscar profesores" });
    }
});

module.exports = router;
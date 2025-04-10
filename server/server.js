const express = require('express');
const session = require('express-session');
const path = require('path');
const sessionConfig = require('./sessionConfig'); // Importar configuración de sesión
const routes = require('./routes'); // Importar rutas
const salonesRoutes = require('./salonesRoutes'); // Importar las rutas de salones
const registrarProfesor = require('./registrarprofesor');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar express-session
app.use(session(sessionConfig));

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../css')));

// Usar rutas
app.use(routes);
app.use('/salones', salonesRoutes); // Usar las rutas de salones

//ruta para insertar doctor
app.use('/registrarprofesor', registrarProfesor);


// Middleware global para manejar errores
app.use((err, req, res, next) => {
    console.error('Error detectado:', err.message, err.stack); // Log detallado del error
    res.status(500).send('Error interno del servidor');
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

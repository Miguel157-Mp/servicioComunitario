const express = require('express');
const session = require('express-session');
const path = require('path');
const sessionConfig = require('./sessionConfig'); // Importar configuración de sesión
const routes = require('./routes'); // Importar rutas
const salonesRoutes = require('./salonesRoutes'); // Importar las rutas de salones
const registrarProfesor = require('./registrarprofesor');
const editarprofesor = require('./editarprofesor');
const mover_mobiliario = require('./mover_mobiliario'); // Importar las rutas de mover mobiliario
const traspasarMobiliario = require('./mover_mobiliario_traspasar');// Importar las rutas de mover mobiliario para traspasar
const buscarSeccion = require('./buscarSeccion'); // Importar la ruta para buscar secciones
const buscarMateria = require('./buscarMateria'); // Importar la ruta para buscar materias
const guardarSeccion = require('./guardarSeccion'); // Importar la ruta para guardar secciones
const actualizarSeccion = require('./actualizarSeccion'); // Importar la ruta para actualizar secciones

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

//ruta para insertar profesor
app.use('/registrarprofesor', registrarProfesor);

//ruta para editar profesor
app.use('/editarprofesor', editarprofesor);

//ruta para mover mobiliario
app.use('/movermobiliario', mover_mobiliario);

//ruta para traspasar mobiliario
app.use('/traspasar', traspasarMobiliario);

//ruta para visualizar seccion 
app.use(routes); 

// Ruta para buscar secciones
app.use('/buscarSeccion', buscarSeccion); 

// Ruta para buscar materias
app.use('/buscarMateria', buscarMateria); 

// Ruta para guardar una nueva sección
app.use('/guardarSeccion', guardarSeccion);

// Ruta para actualizar una sección
app.use('/actualizarSeccion', actualizarSeccion);

// Registrar las rutas



// Middleware global para manejar errores
app.use((err, req, res, next) => {
    console.error('Error detectado:', err.message, err.stack); // Log detallado del error
    res.status(500).send('Error interno del servidor');
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

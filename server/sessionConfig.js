module.exports = {
    secret: 'clave_secreta', // Cambia esto por una clave segura
    resave: false,
    saveUninitialized: false, // No guardar sesiones vacías
    cookie: { secure: false } // Asegúrate de que esté en false para desarrollo
};

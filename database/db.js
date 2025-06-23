// database/db.js
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres', 
    password: '1234',
    port: 5432,
});

// Opcional: Prueba de conexión inicial
async function testConnection() {
    try {
        await pool.query('SELECT 1');
        console.log('Conexión a PostgreSQL exitosa');
    } catch (error) {
        console.error('Error al conectar a PostgreSQL:', error);
    }
}

testConnection(); // Ejecuta la prueba al iniciar el servidor

module.exports = pool; // Exporta el objeto pool
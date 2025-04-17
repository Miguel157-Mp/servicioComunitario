//Importar Base de Datos
// database/import.js
const { exec } = require('child_process');
const path = require('path');

const poolConfig = {
    user: 'postgres',
    host: 'localhost',
    database: 'servicioComunitario',
    password: '1234',
    port: 5432,
};

async function restoreDatabase() {
    /*url para importar bd en archivo .sql */
    const backupFilePath = 'C:\\Users\\Windows 10\\Downloads\\Clinica-main\\servicioComunitario\\ServicioComunitarioConForeignKey.sql';
    const pgRestorePath = 'C:\\Program Files\\PostgreSQL\\17\\bin\\pg_restore.exe'; // Asegúrate de que esta ruta sea correcta

    const command = `"${pgRestorePath}" -U ${poolConfig.user} -d "${poolConfig.database}" -h ${poolConfig.host} -p ${poolConfig.port} "${backupFilePath}"`;

    console.log('Ejecutando comando:', command);

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error('Error al restaurar la base de datos:', error);
            console.error('Stderr:', stderr);
            return;
        }
        console.log('Restauración de la base de datos completada.');
        console.log('Stdout:', stdout);
    });
}

restoreDatabase();
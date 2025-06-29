const bcrypt = require('bcrypt');

async function getHashedPassword(password) {
  try {
    const salt = await bcrypt.genSalt(10); // Genera un salt aleatorio
    const hashedClave = await bcrypt.hash(password, salt); // Hashea la contraseña
    console.log(`El hash de '${password}' es: ${hashedClave}`);
    return hashedClave;
  } catch (error) {
    console.error("Error al generar el hash:", error);
  }
}

getHashedPassword("1234"); // Genera el hash para la contraseña "1234"

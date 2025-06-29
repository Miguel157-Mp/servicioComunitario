const express = require("express");
const pool = require("../database/db"); // Importar el objeto pool
const path = require("path");
const router = express.Router();
const bcrypt = require("bcryptjs");
// Middleware para proteger rutas privadas
function requireLogin(req, res, next) {
  if (!req.session.usuario) {
    return res.redirect("/index.html");
  }
  next();
}

// Middleware para permitir solo administradores
function requireAdmin(req, res, next) {
  if (!req.session.usuario || req.session.usuario.idRol !== 1) {
    return res.status(403).json({ error: "Acceso denegado. Solo administradores pueden registrar usuarios." });
  }
  next();
}

// Ruta principal protegida
router.get("/", requireLogin, (req, res) => {
  res.sendFile(path.join(__dirname, "../dashboard.html"));
});

// Ruta para el login
router.post("/submit", async (req, res, next) => {
  const { usuario, clave } = req.body;

  if (!usuario || !clave) {
    console.error("Datos incompletos en /submit:", req.body);
    // Enviar JSON con error y campos faltantes
    return res.status(400).json({
      success: false,
      message: "Por favor, completa todos los campos.",
      fields: ["usuario", "clave"],
    });
  }

  try {
    // Buscar solo por usuario
    const result = await pool.query(
      'SELECT * FROM "public"."loginusuario" WHERE usuario = $1',
      [usuario]
    );

    if (result.rows.length > 0) {
      const user = result.rows[0];
      console.log('Resultado de la consulta de loginusuario:', user); // DEPURACIÓN
      // Comparar la clave ingresada con la clave encriptada
      const match = await bcrypt.compare(clave, user.clave);
      if (match) {
        req.session.usuario = {
          id: user.id || user.idusuario || user.id_user, // Ajusta según el log
          nombre: user.nombre,
          usuario: user.usuario,
          idRol: Number(user.idRol || user.idrol || user.id_rol), // Ajusta según el log
        };
        console.log('Login exitoso. Usuario guardado en sesión:', req.session.usuario); // DEPURACIÓN
        // Send JSON response instead of redirect
        return res.json({
          success: true,
          usuario: {
            id: user.id || user.idusuario || user.id_user, // Ajusta según el log
            nombre: user.nombre,
            usuario: user.usuario,
            idRol: Number(user.idRol || user.idrol || user.id_rol), // Ajusta según el log
          },
        });
      }
    }
    // Si no hay usuario o la clave no coincide
    res.status(401).json({
      success: false,
      message: "Credenciales incorrectas. Por favor, inténtalo de nuevo.",
    });
  } catch (error) {
    // ...existing code...
    res.status(500).json({
      success: false,
      message:
        "Error al procesar la solicitud. Por favor, inténtalo más tarde.",
    });
    next(error);
  }
});

// Ruta para obtener datos del usuario
router.get("/usuario", requireLogin, (req, res) => {
  console.log('Consulta a /usuario. Usuario en sesión:', req.session.usuario); // DEPURACIÓN
  if (req.session.usuario) {
    // Forzar idRol a número en la respuesta
    res.json({ ...req.session.usuario, idRol: Number(req.session.usuario.idRol) });
  } else {
    res.status(401).json({ error: "No autorizado" });
  }
});

// Ruta para cerrar sesión
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error al cerrar sesión:", err.message, err.stack); // Log detallado
      return res.status(500).send("Error al cerrar sesión");
    }

    res.redirect("/index.html");
  });
});

// Ruta para el registro de usuarios
router.post("/register", requireLogin, requireAdmin, async (req, res, next) => {
  const { usuario, clave, nombre, cedula } = req.body;

  if (!usuario || !clave || !nombre || !cedula) {
    console.error("Datos incompletos en /register:", req.body);
    return res.status(400).send("Datos incompletos");
  }

  try {
    // Verificar si el usuario ya existe
    const existingUser = await pool.query(
      'SELECT * FROM "public"."loginusuario" WHERE usuario = $1',
      [usuario]
    );
    if (existingUser.rows.length > 0) {
      console.warn("Usuario ya existe:", usuario);
      return res.status(500).json({ error: "El usuario ya existe" });
    }
    //encryptar la clave antes de guardarla

    const salt = await bcrypt.genSalt(10);
    //hasear la clave
    const hashedClave = await bcrypt.hash(clave, salt);
    //Registrar usuario en la base de datos
    await pool.query(
      'INSERT INTO "public"."loginusuario" (nombre, cedula, usuario, clave, "idRol") VALUES ($1, $2, $3, $4, $5)',
      [nombre, cedula, usuario, hashedClave, 2]
    );
    // En vez de redirigir, responder con JSON de éxito
    return res.json({ success: true, message: "Usuario registrado correctamente" });
  } catch (error) {
    console.error(
      "Error al registrar usuario en /register:",
      error.message,
      error.stack
    );
    // Responder con error en formato JSON
    return res.status(500).json({ error: "Error al registrar usuario" });
  }
});

//ruta para buscar profesores
router.get("/buscarProfesor", async (req, res) => {
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

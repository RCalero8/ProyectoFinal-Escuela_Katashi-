const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// POST /api/auth/login
router.post('/login', async (req, res) => {
  console.log("=== LOGIN INTENTO ===");
  console.log("Body recibido:", req.body);
  
  const { email, password } = req.body;

  console.log("Email:", email);
  console.log("Password:", password);

  if (!email || !password) {
    console.log("Faltan campos");
    return res.status(400).json({ error: "Email y contraseña son obligatorios" });
  }

  try {
    console.log("Ejecutando query...");
    const resultado = await pool.query(
      `SELECT id_usuario, nombre, apellido, email, tipo_usuario
       FROM usuario
       WHERE email = $1 AND contrasena = $2`,
      [email, password]
    );

    console.log("Filas encontradas:", resultado.rows.length);

    if (resultado.rows.length === 0) {
      // Buscar si el email existe para dar mejor info en logs
      const emailCheck = await pool.query(
        `SELECT contrasena FROM usuario WHERE email = $1`,
        [email]
      );
      if (emailCheck.rows.length > 0) {
        console.log("Email existe pero contraseña incorrecta. Contraseña en BD:", emailCheck.rows[0].contrasena);
      } else {
        console.log("Email no existe en la BD");
      }
      return res.status(401).json({ error: "Email o contraseña incorrectos" });
    }

    const usuario = resultado.rows[0];
    console.log("Login OK:", usuario.email, usuario.tipo_usuario);
    res.json({
      id_usuario:   usuario.id_usuario,
      nombre:       usuario.nombre,
      apellido:     usuario.apellido,
      email:        usuario.email,
      tipo_usuario: usuario.tipo_usuario,
    });

  } catch (error) {
    console.error("Error en query:", error.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;

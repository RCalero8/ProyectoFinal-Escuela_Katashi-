const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email y contraseña son obligatorios" });
  }

  try {
    const resultado = await pool.query(
      `SELECT id_usuario, nombre, apellido, email, tipo_usuario
       FROM usuario
       WHERE email = $1 AND contrasena = $2`,
      [email, password]
    );

    if (resultado.rows.length === 0) {
      return res.status(401).json({ error: "Email o contraseña incorrectos" });
    }

    const usuario = resultado.rows[0];
    res.json({
      id_usuario:   usuario.id_usuario,
      nombre:       usuario.nombre,
      apellido:     usuario.apellido,
      email:        usuario.email,
      tipo_usuario: usuario.tipo_usuario,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;
// auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../config/db'); // Importamos el mismo pool

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email y contraseña son obligatorios" });
  }

  try {
    // 1. Buscar usuario por email
    const resultado = await pool.query(
      'SELECT * FROM usuarios WHERE email = $1', 
      [email]
    );

    if (resultado.rows.length === 0) {
      return res.status(401).json({ error: "Email o contraseña incorrectos" });
    }

    const usuario = resultado.rows[0];

    // 2. Comparar contraseña ingresada con el hash guardado
    const coincide = await bcrypt.compare(password, usuario.contrasena);

    if (!coincide) {
      return res.status(401).json({ error: "Email o contraseña incorrectos" });
    }

    // 3. Login exitoso
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
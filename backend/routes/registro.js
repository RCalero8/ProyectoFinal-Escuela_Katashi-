const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// POST /api/registro
router.post('/', async (req, res) => {
  const { nombre, apellido, email, password } = req.body;

  if (!nombre || !apellido || !email || !password) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  try {
    // 1. Verificar si el email ya existe
    const existeRes = await pool.query(
      'SELECT id_usuario FROM usuario WHERE email = $1',
      [email]
    );

    if (existeRes.rows.length > 0) {
      return res.status(400).json({ error: "El correo electrónico ya está registrado" });
    }

    // 2. Insertar el nuevo usuario (por defecto es CLIENTE)
    const result = await pool.query(
      `INSERT INTO usuario (nombre, apellido, email, contrasena, tipo_usuario)
       VALUES ($1, $2, $3, $4, 'CLIENTE')
       RETURNING id_usuario, nombre, apellido, email, tipo_usuario`,
      [nombre, apellido, email, password]
    );

    const nuevoUsuario = result.rows[0];

    res.status(201).json({
      mensaje: "Usuario registrado con éxito",
      usuario: nuevoUsuario
    });

  } catch (error) {
    console.error("Error en el registro:", error);
    res.status(500).json({ error: "Error interno del servidor al registrar usuario" });
  }
});

module.exports = router;

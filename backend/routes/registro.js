const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

// Configuración de la base de datos (se asume que pool viene de la configuración principal)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // O tu configuración local
  ssl: { rejectUnauthorized: false }
});

// Endpoint para registrar un nuevo usuario
router.post('/api/registro', async (req, res) => {
  const { nombre, apellido, email, contrasena } = req.body;

  if (!nombre || !apellido || !email || !contrasena) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  try {
    // 1. Verificar si el email ya existe
    const existeQuery = 'SELECT * FROM usuarios WHERE email = $1';
    const existeRes = await pool.query(existeQuery, [email]);

    if (existeRes.rows.length > 0) {
      return res.status(400).json({ error: "El correo electrónico ya está registrado" });
    }

    // 2. Insertar el nuevo usuario (por defecto es CLIENTE)
    const insertQuery = `
      INSERT INTO usuarios (nombre, apellido, email, contrasena, tipo_usuario)
      VALUES ($1, $2, $3, $4, 'CLIENTE')
      RETURNING id_usuario, nombre, apellido, email, tipo_usuario
    `;
    
    const result = await pool.query(insertQuery, [nombre, apellido, email, contrasena]);
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
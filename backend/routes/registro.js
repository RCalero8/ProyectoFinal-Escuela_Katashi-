// registro.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../config/db'); // Importamos el pool centralizado

router.post('/api/registro', async (req, res) => {
  const { nombre, apellido, email, contrasena } = req.body;

  if (!nombre || !apellido || !email || !contrasena) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  try {
    // 1. Verificar si el email ya existe
    const existeRes = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    if (existeRes.rows.length > 0) {
      return res.status(400).json({ error: "El correo electrónico ya está registrado" });
    }

    // 2. Cifrar la contraseña
    const saltRounds = 10;
    const contrasenaHash = await bcrypt.hash(contrasena, saltRounds);

    // 3. Insertar usuario con la contraseña cifrada
    const insertQuery = `
      INSERT INTO usuarios (nombre, apellido, email, contrasena, tipo_usuario)
      VALUES ($1, $2, $3, $4, 'CLIENTE')
      RETURNING id_usuario, nombre, apellido, email, tipo_usuario
    `;
    
    const result = await pool.query(insertQuery, [nombre, apellido, email, contrasenaHash]);
    
    res.status(201).json({
      mensaje: "Usuario registrado con éxito",
      usuario: result.rows[0]
    });

  } catch (error) {
    console.error("Error en el registro:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;
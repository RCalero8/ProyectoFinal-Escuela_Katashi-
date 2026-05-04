const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../config/db'); // Asumiendo que esta es la ruta a tu archivo de conexión

router.post('/registro', async (req, res) => {
  const { nombre, apellido, email, contrasena } = req.body;

  // Validación básica
  if (!nombre || !apellido || !email || !contrasena) {
    return res.status(400).json({ error: "Faltan datos obligatorios" });
  }

  try {
    // Iniciar transacción
    await pool.query('BEGIN');

    // 1. Cifrar contraseña
    const saltRounds = 10;
    const contrasenaHash = await bcrypt.hash(contrasena, saltRounds);

    // 2. Insertar en tabla 'usuario'
    const insertUsuario = `
      INSERT INTO usuario (nombre, apellido, email, contrasena, tipo_usuario)
      VALUES ($1, $2, $3, $4, 'CLIENTE')
      RETURNING id_usuar;
    `;
    const userRes = await pool.query(insertUsuario, [nombre, apellido, email, contrasenaHash]);
    const nuevoIdUsuario = userRes.rows[0].id_usuar;

    // 3. Insertar en tabla 'alumno'
    // NOTA: Como en tu formulario no pides DNI ni fecha de nacimiento, 
    // insertaremos valores temporales o NULLs. Asegúrate de actualizar esto luego.
    const insertAlumno = `
      INSERT INTO alumno (nombre, apellido, id_usuar, dni, f_nacimiento, nivel)
      VALUES ($1, $2, $3, 'PENDIENTE', '2000-01-01', 'Blanco');
    `;
    await pool.query(insertAlumno, [nombre, apellido, nuevoIdUsuario]);

    // Confirmar transacción
    await pool.query('COMMIT');

    res.status(201).json({ mensaje: "Usuario y alumno creados con éxito" });

  } catch (error) {
    // Si algo falla, deshacer todo
    await pool.query('ROLLBACK');
    console.error("Error en registro:", error);
    res.status(500).json({ error: "Error al registrar usuario en la base de datos" });
  }
});

module.exports = router;
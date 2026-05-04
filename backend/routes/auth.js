const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../config/db');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar al usuario
    const resultado = await pool.query('SELECT * FROM usuario WHERE email = $1', [email]);
    
    if (resultado.rows.length === 0) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const usuario = resultado.rows[0];

    // Comparar la contraseña enviada con el hash guardado
    const coincide = await bcrypt.compare(password, usuario.contrasena);
    
    if (!coincide) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    res.json({ id_usuario: usuario.id_usuario, nombre: usuario.nombre, tipo: usuario.tipo_usuario });
  } catch (error) {
    res.status(500).json({ error: "Error de servidor" });
  }
});

module.exports = router;
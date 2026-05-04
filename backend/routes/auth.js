const bcrypt = require('bcrypt'); // Importa bcrypt

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

    res.json({ id_usuar: usuario.id_usuar, nombre: usuario.nombre, tipo: usuario.tipo_usuario });
  } catch (error) {
    res.status(500).json({ error: "Error de servidor" });
  }
});
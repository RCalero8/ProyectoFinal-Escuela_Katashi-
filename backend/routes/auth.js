const express = require("express");
const router = express.Router();
const conexion = require("../config/db");

// POST /api/auth/login - Iniciar sesión
router.post("/login", async (req, res) => {
  const { email, contrasena } = req.body;

  if (!email || !contrasena) {
    return res.status(400).json({ error: "Email y contraseña son requeridos" });
  }

  try {
    // Consulta usando los nombres de campos exactos de la imagen del usuario
    const query = "SELECT id_usuario, nombre, apellido, email, tipo_usuario FROM usuarios WHERE email = $1 AND contrasena = $2";
    const resultado = await conexion.query(query, [email, contrasena]);

    if (resultado.rows.length > 0) {
      const usuario = resultado.rows[0];
      res.json({
        mensaje: "Inicio de sesión exitoso",
        usuario: {
          id: usuario.id_usuario,
          nombre: usuario.nombre,
          apellido: usuario.apellido,
          email: usuario.email,
          rol: usuario.tipo_usuario
        }
      });
    } else {
      res.status(401).json({ error: "Credenciales incorrectas" });
    }
  } catch (error) {
    console.error("Error en el login:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// POST /api/auth/recuperar - Simular recuperación de contraseña
router.post("/recuperar", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "El email es requerido" });
  }

  try {
    const query = "SELECT id_usuario FROM usuarios WHERE email = $1";
    const resultado = await conexion.query(query, [email]);

    if (resultado.rows.length > 0) {
      // Aquí iría la lógica para enviar un email real
      res.json({ mensaje: "Se ha enviado un enlace de recuperación a tu correo" });
    } else {
      res.status(404).json({ error: "No existe una cuenta con ese email" });
    }
  } catch (error) {
    console.error("Error en recuperación:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;

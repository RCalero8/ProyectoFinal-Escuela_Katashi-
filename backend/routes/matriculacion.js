const express = require('express');
const router  = express.Router();
const pool    = require('../config/db');

// POST /api/matriculacion
router.post('/', async (req, res) => {
  const { alumno, tutor, es_mayor, metodo_pago, autoriza_imagenes, cuenta } = req.body;

  if (!alumno || !cuenta) return res.status(400).json({ error: "Faltan datos" });

  try {
    // 1. Comprobar si el email ya existe
    const emailExiste = await pool.query(
      `SELECT id_usuario FROM usuario WHERE email = $1`, [cuenta.email]
    );
    if (emailExiste.rows.length > 0)
      return res.status(409).json({ error: "Este email ya está registrado" });

    // 2. Crear usuario
    const nuevoUsuario = await pool.query(
      `INSERT INTO usuario (nombre, apellido, email, contrasena, tipo_usuario, metodo_pago)
       VALUES ($1, $2, $3, $4, 'CLIENTE', $5)
       RETURNING id_usuario, nombre, apellido, email, tipo_usuario, metodo_pago`,
      [cuenta.nombre, cuenta.apellido, cuenta.email, cuenta.password, metodo_pago]
    );

    const usuario = nuevoUsuario.rows[0];

    // 3. Crear alumno
    const nombreAlumno   = alumno.nombre;
    const apellidoAlumno = alumno.apellido;
    const dniAlumno      = alumno.dni;
    const fechaNac       = alumno.fecha_nacimiento;

    await pool.query(
      `INSERT INTO alumno (dni, nombre, apellido, f_nacimiento, nivel, id_usuario)
       VALUES ($1, $2, $3, $4, 'Blanco', $5)`,
      [dniAlumno, nombreAlumno, apellidoAlumno, fechaNac, usuario.id_usuario]
    );

    // 4. Si hay tutor (menor de edad), guardarlo como observación o tabla separada
    // Por ahora lo guardamos en observaciones de la tabla alumno (opcional)

    res.status(201).json({
      mensaje: "Matrícula registrada correctamente",
      usuario: {
        id_usuario:   usuario.id_usuario,
        nombre:       usuario.nombre,
        apellido:     usuario.apellido,
        email:        usuario.email,
        tipo_usuario: usuario.tipo_usuario,
        metodo_pago:  usuario.metodo_pago,
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al procesar la matrícula" });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// GET /api/matriculacion/cursos — cursos disponibles para matricularse
router.get('/cursos', async (req, res) => {
  try {
    const resultado = await pool.query(
      `SELECT id_curso, nombre, descripcion, f_inicio, f_fin, precio
       FROM curso
       ORDER BY f_inicio`
    );
    res.json(resultado.rows);
  } catch (error) {
    console.error("Error al obtener cursos:", error);
    res.status(500).json({ error: "Error al obtener los cursos disponibles" });
  }
});

// POST /api/matriculacion — matricular alumno en un curso
router.post('/', async (req, res) => {
  const { id_usuario, dni, nombre, apellido, f_nacimiento, nivel, id_curso } = req.body;

  if (!id_usuario || !dni || !nombre || !apellido || !f_nacimiento || !id_curso) {
    return res.status(400).json({ error: "Todos los campos obligatorios deben estar completos" });
  }

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // 1. Verificar que el usuario existe
    const usuarioRes = await client.query(
      'SELECT id_usuario FROM usuario WHERE id_usuario = $1',
      [id_usuario]
    );
    if (usuarioRes.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // 2. Verificar que el curso existe
    const cursoRes = await client.query(
      'SELECT id_curso, nombre FROM curso WHERE id_curso = $1',
      [id_curso]
    );
    if (cursoRes.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: "Curso no encontrado" });
    }

    // 3. Comprobar si ya existe un alumno con ese DNI
    let id_alumno;
    const alumnoExiste = await client.query(
      'SELECT id_alumno FROM alumno WHERE dni = $1',
      [dni]
    );

    if (alumnoExiste.rows.length > 0) {
      id_alumno = alumnoExiste.rows[0].id_alumno;
    } else {
      // Crear el registro de alumno
      const alumnoRes = await client.query(
        `INSERT INTO alumno (dni, nombre, apellido, f_nacimiento, nivel, id_usuario)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING id_alumno`,
        [dni, nombre, apellido, f_nacimiento, nivel || 'Principiante', id_usuario]
      );
      id_alumno = alumnoRes.rows[0].id_alumno;
    }

    // 4. Verificar que no esté ya inscrito en este curso
    const inscripcionExiste = await client.query(
      'SELECT codigo FROM inscripcion WHERE id_alumno = $1 AND id_curso = $2',
      [id_alumno, id_curso]
    );
    if (inscripcionExiste.rows.length > 0) {
      await client.query('ROLLBACK');
      return res.status(400).json({ error: "El alumno ya está inscrito en este curso" });
    }

    // 5. Crear la inscripción
    const inscripcionRes = await client.query(
      `INSERT INTO inscripcion (estado, id_usuario, id_curso, id_alumno)
       VALUES ('ACTIVA', $1, $2, $3)
       RETURNING codigo, f_inscripcion, estado`,
      [id_usuario, id_curso, id_alumno]
    );

    await client.query('COMMIT');

    res.status(201).json({
      mensaje: "Matriculación realizada con éxito",
      inscripcion: inscripcionRes.rows[0],
      alumno: { id_alumno, dni, nombre, apellido },
      curso: cursoRes.rows[0]
    });

  } catch (error) {
    await client.query('ROLLBACK');
    console.error("Error en la matriculación:", error);
    res.status(500).json({ error: "Error interno del servidor al procesar la matriculación" });
  } finally {
    client.release();
  }
});

module.exports = router;

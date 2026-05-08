const express = require('express');
const router  = express.Router();
const pool    = require('../config/db');

// GET /api/inscripciones/:id_usuario — inscripciones del usuario
router.get('/:id_usuario', async (req, res) => {
  const { id_usuario } = req.params;
  try {
    const resultado = await pool.query(
      `SELECT i.codigo, i.f_inscripcion, i.estado,
              c.nombre AS curso_nombre, c.descripcion,
              h.dia, h.hora, h.dojo, h.tipo_clase,
              u2.nombre AS sensei_nombre, u2.apellido AS sensei_apellido
       FROM inscripcion i
       INNER JOIN cursos c ON i.id_curso = c.id_curso
       LEFT JOIN horario h ON h.id_usuario = i.id_usuario
       LEFT JOIN usuario u2 ON h."Sensei" = u2.id_usuario
       WHERE i.id_usuario = $1
       ORDER BY i.f_inscripcion DESC`,
      [id_usuario]
    );
    res.json(resultado.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las inscripciones" });
  }
});

// POST /api/inscripciones — inscribirse
router.post('/', async (req, res) => {
  const { id_usuario, id_curso, id_alumno } = req.body;
  if (!id_usuario || !id_curso)
    return res.status(400).json({ error: "Faltan datos" });

  try {
    // Comprobar si ya está inscrito
    const existe = await pool.query(
      `SELECT codigo FROM inscripcion WHERE id_usuario = $1 AND id_curso = $2 AND estado = 'ACTIVA'`,
      [id_usuario, id_curso]
    );
    if (existe.rows.length > 0)
      return res.status(409).json({ error: "Ya estás inscrito en esta clase" });

    const resultado = await pool.query(
      `INSERT INTO inscripcion (id_usuario, id_curso, id_alumno, estado)
       VALUES ($1, $2, $3, 'ACTIVA')
       RETURNING codigo`,
      [id_usuario, id_curso, id_alumno || null]
    );
    res.status(201).json({ mensaje: "Inscripción realizada correctamente", codigo: resultado.rows[0].codigo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al inscribirse" });
  }
});

// PUT /api/inscripciones/:codigo — darse de baja
router.put('/:codigo', async (req, res) => {
  const { codigo } = req.params;
  try {
    await pool.query(
      `UPDATE inscripcion SET estado = 'BAJA' WHERE codigo = $1`,
      [codigo]
    );
    res.json({ mensaje: "Baja realizada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al darse de baja" });
  }
});

// GET /api/inscripciones/cursos/disponibles — todos los cursos disponibles
router.get('/cursos/disponibles', async (req, res) => {
  try {
    const resultado = await pool.query(
      `SELECT c.id_curso, c.nombre, c.descripcion,
              COUNT(i.codigo) AS inscritos
       FROM cursos c
       LEFT JOIN inscripcion i ON c.id_curso = i.id_curso AND i.estado = 'ACTIVA'
       GROUP BY c.id_curso, c.nombre, c.descripcion
       ORDER BY c.nombre ASC`
    );
    res.json(resultado.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los cursos" });
  }
});

module.exports = router;

const express = require('express');
const router  = require('express').Router();
const pool    = require('../config/db');

// GET /api/asistencia/:id_usuario — historial del usuario
router.get('/:id_usuario', async (req, res) => {
  const { id_usuario } = req.params;
  try {
    const resultado = await pool.query(
      `SELECT a.id_asistencia, a.fecha, a.presente,
              h.dia, h.hora, h.tipo_clase, h.dojo
       FROM asistencia a
       INNER JOIN horario h ON a.id_horario = h.id_horario
       WHERE a.id_usuario = $1
       ORDER BY a.fecha DESC`,
      [id_usuario]
    );
    res.json(resultado.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener la asistencia" });
  }
});

// GET /api/asistencia/clase/:id_horario/:fecha — lista de alumnos para pasar lista
router.get('/clase/:id_horario/:fecha', async (req, res) => {
  const { id_horario, fecha } = req.params;
  try {
    const resultado = await pool.query(
      `SELECT a.id_asistencia, a.presente,
              u.id_usuario, u.nombre, u.apellido
       FROM asistencia a
       INNER JOIN usuario u ON a.id_usuario = u.id_usuario
       WHERE a.id_horario = $1 AND a.fecha = $2
       ORDER BY u.apellido ASC`,
      [id_horario, fecha]
    );
    res.json(resultado.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener la lista" });
  }
});

// POST /api/asistencia — crear registros de asistencia para una clase
router.post('/', async (req, res) => {
  const { id_horario, fecha, alumnos } = req.body;
  // alumnos: [{ id_usuario, presente }]
  if (!id_horario || !fecha || !alumnos)
    return res.status(400).json({ error: "Faltan datos" });

  try {
    for (const alumno of alumnos) {
      await pool.query(
        `INSERT INTO asistencia (id_usuario, id_horario, fecha, presente)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT DO NOTHING`,
        [alumno.id_usuario, id_horario, fecha, alumno.presente]
      );
    }
    res.status(201).json({ mensaje: "Asistencia registrada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al registrar la asistencia" });
  }
});

// PUT /api/asistencia/:id_asistencia — actualizar asistencia
router.put('/:id_asistencia', async (req, res) => {
  const { id_asistencia } = req.params;
  const { presente } = req.body;
  try {
    await pool.query(
      `UPDATE asistencia SET presente = $1 WHERE id_asistencia = $2`,
      [presente, id_asistencia]
    );
    res.json({ mensaje: "Asistencia actualizada" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar la asistencia" });
  }
});

module.exports = router;
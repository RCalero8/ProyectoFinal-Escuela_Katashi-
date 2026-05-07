const express = require('express');
const router  = express.Router();
const pool    = require('../config/db');

// GET /api/horario/:id_usuario
router.get('/:id_usuario', async (req, res) => {
  const { id_usuario } = req.params;
  try {
    const resultado = await pool.query(
      `SELECT h.id_horario, h.dia, h.hora, h.tipo_clase, h.dojo,
              u.nombre AS sensei_nombre, u.apellido AS sensei_apellido
       FROM horario h
       LEFT JOIN usuario u ON h.id_sensei = u.id_usuario
       WHERE h.id_usuario = $1
       ORDER BY 
         CASE h.dia
           WHEN 'Lunes'     THEN 1
           WHEN 'Martes'    THEN 2
           WHEN 'Miércoles' THEN 3
           WHEN 'Jueves'    THEN 4
           WHEN 'Viernes'   THEN 5
           WHEN 'Sábado'    THEN 6
           WHEN 'Domingo'   THEN 7
         END, h.hora ASC`,
      [id_usuario]
    );
    res.json(resultado.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los horarios" });
  }
});

module.exports = router;
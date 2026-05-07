const express = require('express');
const router  = express.Router();
const pool    = require('../config/db');

// GET /api/horario/:id_usuario
router.get('/:id_usuario', async (req, res) => {
  const { id_usuario } = req.params;
  try {
    const resultado = await pool.query(
      `SELECT id_horario, dia, hora, tipo_clase, dojo
       FROM horario
       WHERE id_usuario = $1
       ORDER BY 
         CASE dia
           WHEN 'Lunes'     THEN 1
           WHEN 'Martes'    THEN 2
           WHEN 'Miércoles' THEN 3
           WHEN 'Jueves'    THEN 4
           WHEN 'Viernes'   THEN 5
           WHEN 'Sábado'    THEN 6
           WHEN 'Domingo'   THEN 7
         END, hora ASC`,
      [id_usuario]
    );
    res.json(resultado.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los horarios" });
  }
});

module.exports = router;

const express = require('express');
const router  = express.Router();
const pool    = require('../config/db');

// GET /api/federacion/:id_usuario — fichas de federación del usuario (una por alumno)
router.get('/:id_usuario', async (req, res) => {
  const { id_usuario } = req.params;
  try {
    const resultado = await pool.query(
      `SELECT f.n_licencia, f.categoria, f.f_alta, f.f_renovacion,
              f.resultados_competic, f.documentos, f.observaciones,
              a.id_alumno, a.nombre AS alumno_nombre, a.apellido AS alumno_apellido,
              a.dni, a.f_nacimiento, a.nivel
       FROM federacion f
       INNER JOIN alumno a ON f.id_alumno = a.id_alumno
       WHERE a.id_usuario = $1
       ORDER BY a.id_alumno ASC`,
      [id_usuario]
    );
    res.json(resultado.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener la federación" });
  }
});

module.exports = router;

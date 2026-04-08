const express = require("express");
const router = express.Router();
const conexion = require("../config/db"); // Esto ahora importa el Pool de 'pg'

// Obtener los testimonios
router.get("/", async (req, res) => {
  const sql = `
    SELECT 
      t.id_testimonio,
      t.texto,
      t.rol,
      t.estrellas,
      u.nombre,
      u.apellido
    FROM testimonio t
    INNER JOIN usuario u ON t.id_usuario = u.id_usuario
    ORDER BY t.id_testimonio ASC
  `;

  try {
    // En PostgreSQL (pg), el resultado llega en un objeto. Usamos .rows para obtener los datos.
    const resultado = await conexion.query(sql);
    res.json(resultado.rows); 
  } catch (error) {
    console.error("Error en la consulta:", error);
    res.status(500).json({ error: "Error al obtener los testimonios" });
  }
});

module.exports = router;
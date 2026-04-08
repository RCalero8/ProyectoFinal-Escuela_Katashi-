const express = require("express");
const router = express.Router();
const conexion = require("../config/db");

// Obtener todos los senseis
router.get("/", async (req, res) => {
  const sql = `
    SELECT 
      i.id_info,
      i.id_usuario,
      i.dan,
      i.rol_web,
      i.biografia,
      u.nombre,
      u.apellido
    FROM info_sensei i
    INNER JOIN usuario u ON i.id_usuario = u.id_usuario
    ORDER BY i.id_info ASC
  `;

  try {
    const resultado = await conexion.query(sql);
    res.json(resultado.rows);
  } catch (error) {
    console.error("Error al obtener senseis:", error);
    res.status(500).json({ error: "Error al obtener los senseis" });
  }
});

// Obtener un sensei por ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  
  // IMPORTANTE: En PostgreSQL usamos $1 en lugar de ?
  const sql = `
    SELECT 
      i.id_info,
      i.id_usuario,
      i.dan,
      i.rol_web,
      i.biografia,
      u.nombre,
      u.apellido
    FROM info_sensei i
    INNER JOIN usuario u ON i.id_usuario = u.id_usuario
    WHERE i.id_info = $1
  `;

  try {
    const resultado = await conexion.query(sql, [id]);
    
    if (resultado.rows.length === 0) {
      return res.status(404).json({ error: "Sensei no encontrado" });
    }
    
    // Devolvemos solo el primer resultado
    res.json(resultado.rows[0]);
  } catch (error) {
    console.error("Error al obtener el sensei:", error);
    res.status(500).json({ error: "Error al obtener el sensei" });
  }
});

module.exports = router;

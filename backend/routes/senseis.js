const express = require("express");
const router = express.Router();
const conexion = require("../config/db");

// Obtener todos los senseis
router.get("/", (req, res) => {
    const sql  = `
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
     conexion.query(sql, (error, resultados) => {
    if (error) return res.status(500).json({ error: "Error al obtener los senseis" });
    res.json(resultados);
  });
});

// Obtener un sensei por ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
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
    WHERE i.id_info = ?
  `;
 
  conexion.query(sql, [id], (error, resultados) => {
    if (error) return res.status(500).json({ error: "Error al obtener el sensei" });
    if (resultados.length === 0) return res.status(404).json({ error: "Sensei no encontrado" });
    res.json(resultados[0]);
  });
});
module.exports = router;

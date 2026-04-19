const express  = require("express");
const router   = express.Router();
const conexion = require("../config/db");

//Get /api/material
router.get("/", (req, res) => {
  const sql = `
    SELECT id_material, nombre, descripcion, precio, stock, Categoria, Imagen, Talla, Color
    FROM material
    ORDER BY id_material ASC
  `;
  conexion.query(sql, (error, resultados) => {
    if (error) return res.status(500).json({ error: "Error al obtener los materiales" });
    res.json(resultados);
  });
});

//Get /api/material/:id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  conexion.query(
    "SELECT id_material, nombre, descripcion, precio, stock, Categoria, Imagen, Talla, Color FROM material WHERE id_material = ?",
    [id],
    (error, resultados) => {
      if (error) return res.status(500).json({ error: "Error al obtener el material" });
      if (resultados.length === 0) return res.status(404).json({ error: "Material no encontrado" });
      res.json(resultados[0]);
    }
  );
});
 
module.exports = router;
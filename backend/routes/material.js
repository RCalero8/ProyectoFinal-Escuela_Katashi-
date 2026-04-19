const express  = require("express");
const router   = express.Router();
const pool = require("../config/db");

//Get /api/material
router.get("/", async (req, res) => {
  try {
    const resultado = await pool.query(
      `SELECT id_material, nombre, descripcion, precio, stock, "Categoria", "Imagen", "Talla", "Color"
       FROM material
       ORDER BY id_material ASC`
    );
    res.json(resultado.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los materiales" });
  }
});

//Get /api/material/:id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await pool.query(
      `SELECT id_material, nombre, descripcion, precio, stock, "Categoria", "Imagen", "Talla", "Color"
       FROM material
       WHERE id_material = $1`,
      [id]
    );
    if (resultado.rows.length === 0)
      return res.status(404).json({ error: "Material no encontrado" });
    res.json(resultado.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el material" });
  }
});
 
module.exports = router;
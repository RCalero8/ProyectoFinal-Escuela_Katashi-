const express = require("express");
const router = express.Router();
const conexion = require("../config/db");

// GET /api/productos - Obtener productos con filtros avanzados (id_material, stock)
router.get("/", async (req, res) => {
  const { buscar, orden, minPrecio, maxPrecio } = req.query;
  
  // Usamos los nombres de campos exactos de la imagen del usuario
  let query = "SELECT id_material, nombre, descripcion, precio, stock FROM material WHERE 1=1";
  let params = [];
  let paramIndex = 1;

  if (buscar) {
    query += ` AND (nombre ILIKE $${paramIndex} OR descripcion ILIKE $${paramIndex})`;
    params.push(`%${buscar}%`);
    paramIndex++;
  }

  if (minPrecio) {
    query += ` AND precio >= $${paramIndex}`;
    params.push(parseFloat(minPrecio));
    paramIndex++;
  }

  if (maxPrecio) {
    query += ` AND precio <= $${paramIndex}`;
    params.push(parseFloat(maxPrecio));
    paramIndex++;
  }

  // Ordenación
  if (orden === "Precio: Menor a Mayor") {
    query += " ORDER BY precio ASC";
  } else if (orden === "Precio: Mayor a Menor") {
    query += " ORDER BY precio DESC";
  } else {
    query += " ORDER BY id_material DESC"; // Por defecto: más recientes
  }

  try {
    const resultado = await conexion.query(query, params);
    res.json(resultado.rows);
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    res.status(500).json({ error: "Error al obtener los productos" });
  }
});

module.exports = router;

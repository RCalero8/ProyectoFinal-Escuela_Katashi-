const express  = require("express");
const router   = express.Router();
const conexion = require("../config/db");

// Obtener todas las clases
router.get("/", async (req, res) => {
  try {
    const sql = "SELECT * FROM clase";
    const resultado = await conexion.query(sql);
    res.json(resultado.rows);
  } catch (error) {
    console.error("Error al obtener clases:", error);
    res.status(500).json({ error: "Error al obtener las clases" });
  }
});

// Crear una nueva clase
router.post("/", async (req, res) => {
  const { grado, duracion_min, id_curso } = req.body;

  if (!grado || !duracion_min || !id_curso)
    return res.status(400).json({ error: "Todos los campos son obligatorios" });

  // En PostgreSQL usamos $1, $2, $3 y RETURNING id_clase
  const sql = `
    INSERT INTO clase (grado, duracion_min, id_curso)
    VALUES ($1, $2, $3)
    RETURNING id_clase
  `;

  try {
    const resultado = await conexion.query(sql, [grado, duracion_min, id_curso]);
    res.status(201).json({
      mensaje: "Clase creada correctamente",
      id: resultado.rows[0].id_clase
    });
  } catch (error) {
    console.error("Error al crear clase:", error);
    res.status(500).json({ error: "Error al crear la clase" });
  }
});

module.exports = router;
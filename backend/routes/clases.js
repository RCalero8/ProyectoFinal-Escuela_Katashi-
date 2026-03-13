const express  = require("express");
const router   = express.Router();
const conexion = require("../config/db");

// Obtener clases
router.get("/", (req, res) => {
  conexion.query("SELECT * FROM clase", (error, resultados) => {
    if (error) return res.status(500).json({ error: "Error al obtener las clases" });
    res.json(resultados);
  });
});

// Crear clase
router.post("/", (req, res) => {
  const { grado, duracion_min, id_curso } = req.body;

  if (!grado || !duracion_min || !id_curso)
    return res.status(400).json({ error: "Todos los campos son obligatorios" });

  const sql = `
    INSERT INTO clase (grado, duracion_min, id_curso)
    VALUES (?, ?, ?)
  `;

  conexion.query(sql, [grado, duracion_min, id_curso], (error, resultado) => {
    if (error) return res.status(500).json({ error: "Error al crear la clase" });

    res.status(201).json({
      mensaje: "Clase creada correctamente",
      id: resultado.insertId
    });
  });
});

module.exports = router;

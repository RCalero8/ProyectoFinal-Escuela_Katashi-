const express = require("express");
const router = express.Router();
const conexion = require("../config/db");

//Obtener todos los cursos
router.get("/", (req, res) => {
    const query = `
    SELECT c.id_curso, c.nombre, c.f_inicio, c.f_fin, cl.grado, cl.duracion_min 
    FROM curso c
    LEFT JOIN clase cl ON c.id_curso = cl.id_curso
  `;
    conexion.query(query, (error, resultados) => {
        if (error) return res.status(500).json({ error: "Error al obtener los cursos" });
        res.json(resultados);
    });
});

//Obtener un curso por ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const query = `
    SELECT c.*, cl.grado, cl.duracion_min 
    FROM curso c 
    LEFT JOIN clase cl ON c.id_curso = cl.id_curso 
    WHERE c.id_curso = ?
  `;
  
  conexion.query(query, [id], (error, resultados) => {
    if (error) return res.status(500).json({ error: "Error al obtener el curso" });
    if (resultados.length === 0) return res.status(404).json({ error: "Curso no encontrado" });
    res.json(resultados[0]);
  });
});

module.exports = router;
const express  = require("express");
const router   = express.Router();
const conexion = require("../config/db");

// Obtener todos los cursos con límite opcional
router.get("/", (req, res) => {
  const limite = parseInt(req.query.limite) || 10;

  const sql = `
    SELECT id_curso, nombre, descripcion, f_inicio, f_fin
    FROM curso
    LIMIT ?
  `;

  conexion.query(sql, [limite], (error, resultados) => {
    if (error) return res.status(500).json({ error: "Error al obtener los cursos" });
    res.json(resultados);
  });
});

// Obtener un curso + sus clases
router.get("/:id", (req, res) => {
  const { id } = req.params;

  const sqlCurso = `
    SELECT id_curso, nombre, descripcion, f_inicio, f_fin
    FROM curso
    WHERE id_curso = ?
  `;

  const sqlClases = `
    SELECT id_clase, grado, duracion_min, id_curso
    FROM clase
    WHERE id_curso = ?
  `;

  conexion.query(sqlCurso, [id], (error, cursoRes) => {
    if (error) return res.status(500).json({ error: "Error al obtener el curso" });
    if (cursoRes.length === 0) return res.status(404).json({ error: "Curso no encontrado" });

    conexion.query(sqlClases, [id], (error2, clasesRes) => {
      if (error2) return res.status(500).json({ error: "Error al obtener las clases" });

      res.json({
        ...cursoRes[0],
        clases: clasesRes
      });
    });
  });
});

// Crear curso
router.post("/", (req, res) => {
  const { nombre, descripcion, f_inicio, f_fin } = req.body;

  if (!nombre || !f_inicio || !f_fin)
    return res.status(400).json({ error: "Nombre, fecha inicio y fecha fin son obligatorios" });

  const sql = `
    INSERT INTO curso (nombre, descripcion, f_inicio, f_fin)
    VALUES (?, ?, ?, ?)
  `;

  conexion.query(sql, [nombre, descripcion, f_inicio, f_fin], (error, resultado) => {
    if (error) return res.status(500).json({ error: "Error al crear el curso" });

    res.status(201).json({
      mensaje: "Curso creado correctamente",
      id: resultado.insertId
    });
  });
});

// Editar curso
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, f_inicio, f_fin } = req.body;

  if (!nombre || !f_inicio || !f_fin)
    return res.status(400).json({ error: "Nombre, fecha inicio y fecha fin son obligatorios" });

  const sql = `
    UPDATE curso
    SET nombre = ?, descripcion = ?, f_inicio = ?, f_fin = ?
    WHERE id_curso = ?
  `;

  conexion.query(sql, [nombre, descripcion, f_inicio, f_fin, id], (error, resultado) => {
    if (error) return res.status(500).json({ error: "Error al actualizar el curso" });
    if (resultado.affectedRows === 0) return res.status(404).json({ error: "Curso no encontrado" });

    res.json({ mensaje: "Curso actualizado correctamente" });
  });
});

// Eliminar curso
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM curso WHERE id_curso = ?";

  conexion.query(sql, [id], (error, resultado) => {
    if (error) return res.status(500).json({ error: "Error al eliminar el curso" });
    if (resultado.affectedRows === 0) return res.status(404).json({ error: "Curso no encontrado" });

    res.json({ mensaje: "Curso eliminado correctamente" });
  });
});

module.exports = router;

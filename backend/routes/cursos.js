const express  = require("express");
const router   = express.Router();
const conexion = require("../config/db");

// Obtener todos los cursos con límite opcional
router.get("/", async (req, res) => {
  const limite = parseInt(req.query.limite) || 10;
  const sql = `
    SELECT id_curso, nombre, descripcion, f_inicio, f_fin
    FROM curso
    LIMIT $1
  `;

  try {
    const resultado = await conexion.query(sql, [limite]);
    res.json(resultado.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los cursos" });
  }
});

// Obtener un curso + sus clases (Consultas paralelas)
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const sqlCurso = `
    SELECT id_curso, nombre, descripcion, f_inicio, f_fin
    FROM curso
    WHERE id_curso = $1
  `;

  const sqlClases = `
    SELECT id_clase, grado, duracion_min, id_curso
    FROM clase
    WHERE id_curso = $1
  `;

  try {
    // Ejecutamos ambas consultas a la vez para ir más rápido
    const cursoRes = await conexion.query(sqlCurso, [id]);
    
    if (cursoRes.rows.length === 0) {
      return res.status(404).json({ error: "Curso no encontrado" });
    }

    const clasesRes = await conexion.query(sqlClases, [id]);

    res.json({
      ...cursoRes.rows[0],
      clases: clasesRes.rows
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el curso y sus clases" });
  }
});

// Crear curso
router.post("/", async (req, res) => {
  const { nombre, descripcion, f_inicio, f_fin } = req.body;

  if (!nombre || !f_inicio || !f_fin)
    return res.status(400).json({ error: "Nombre, fecha inicio y fecha fin son obligatorios" });

  const sql = `
    INSERT INTO curso (nombre, descripcion, f_inicio, f_fin)
    VALUES ($1, $2, $3, $4)
    RETURNING id_curso
  `;

  try {
    const resultado = await conexion.query(sql, [nombre, descripcion, f_inicio, f_fin]);
    res.status(201).json({
      mensaje: "Curso creado correctamente",
      id: resultado.rows[0].id_curso
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el curso" });
  }
});

// Editar curso
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, f_inicio, f_fin } = req.body;

  if (!nombre || !f_inicio || !f_fin)
    return res.status(400).json({ error: "Nombre, fecha inicio y fecha fin son obligatorios" });

  const sql = `
    UPDATE curso
    SET nombre = $1, descripcion = $2, f_inicio = $3, f_fin = $4
    WHERE id_curso = $5
  `;

  try {
    const resultado = await conexion.query(sql, [nombre, descripcion, f_inicio, f_fin, id]);
    if (resultado.rowCount === 0) return res.status(404).json({ error: "Curso no encontrado" });
    res.json({ mensaje: "Curso actualizado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el curso" });
  }
});

// Eliminar curso
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM curso WHERE id_curso = $1";

  try {
    const resultado = await conexion.query(sql, [id]);
    if (resultado.rowCount === 0) return res.status(404).json({ error: "Curso no encontrado" });
    res.json({ mensaje: "Curso eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar el curso" });
  }
});

module.exports = router;
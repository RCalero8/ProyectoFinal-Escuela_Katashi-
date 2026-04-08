const express  = require("express");
const router   = express.Router();
const conexion = require("../config/db");

// Obtener noticias con límite
router.get("/", async (req, res) => {
  const limite = parseInt(req.query.limite) || 3;
  try {
    // En Postgres, el LIMIT también acepta el parámetro así
    const sql = "SELECT id, titulo, fecha, enlace FROM noticias ORDER BY fecha DESC LIMIT $1";
    const resultado = await conexion.query(sql, [limite]);
    res.json(resultado.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las noticias" });
  }
});

// Obtener noticia por ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const sql = "SELECT id, titulo, fecha, contenido, enlace FROM noticias WHERE id = $1";
    const resultado = await conexion.query(sql, [id]);
    if (resultado.rows.length === 0) return res.status(404).json({ error: "Noticia no encontrada" });
    res.json(resultado.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la noticia" });
  }
});

// Crear noticia
router.post("/", async (req, res) => {
  const { titulo, fecha, contenido, enlace } = req.body;
  if (!titulo || !fecha) return res.status(400).json({ error: "El título y la fecha son obligatorios" });
  
  try {
    // En Postgres usamos RETURNING id para obtener el ID del nuevo registro
    const sql = "INSERT INTO noticias (titulo, fecha, contenido, enlace) VALUES ($1, $2, $3, $4) RETURNING id";
    const resultado = await conexion.query(sql, [titulo, fecha, contenido, enlace]);
    res.status(201).json({ mensaje: "Noticia creada correctamente", id: resultado.rows[0].id });
  } catch (error) {
    res.status(500).json({ error: "Error al crear la noticia" });
  }
});

// Editar noticia
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { titulo, fecha, contenido, enlace } = req.body;
  
  try {
    const sql = "UPDATE noticias SET titulo = $1, fecha = $2, contenido = $3, enlace = $4 WHERE id = $5";
    const resultado = await conexion.query(sql, [titulo, fecha, contenido, enlace, id]);
    
    // rowCount nos dice cuántas filas se modificaron
    if (resultado.rowCount === 0) return res.status(404).json({ error: "Noticia no encontrada" });
    res.json({ mensaje: "Noticia actualizada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al editar la noticia" });
  }
});

// Eliminar noticia
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const sql = "DELETE FROM noticias WHERE id = $1";
    const resultado = await conexion.query(sql, [id]);
    
    if (resultado.rowCount === 0) return res.status(404).json({ error: "Noticia no encontrada" });
    res.json({ mensaje: "Noticia eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la noticia" });
  }
});

module.exports = router;
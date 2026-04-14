const express = require("express");
const router = express.Router();
const conexion = require("../config/db");

// GET /api/noticias
router.get("/", async (req, res) => {
  const limite = parseInt(req.query.limite, 10) || 3;
  try {
    const resultado = await conexion.query(
      "SELECT id, titulo, fecha, enlace, categoria FROM noticias ORDER BY fecha DESC LIMIT $1",
      [limite]
    );
    res.json(resultado.rows);
  } catch (error) {
    console.error("Error al obtener las noticias:", error);
    res.status(500).json({ error: "Error al obtener las noticias" });
  }
});

// GET /api/noticias/:id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await conexion.query(
      "SELECT id, titulo, fecha, contenido, enlace, categoria FROM noticias WHERE id = $1",
      [id]
    );
    if (resultado.rows.length === 0) return res.status(404).json({ error: "Noticia no encontrada" });
    res.json(resultado.rows[0]);
  } catch (error) {
    console.error("Error al obtener la noticia:", error);
    res.status(500).json({ error: "Error al obtener la noticia" });
  }
});

// POST /api/noticias
router.post("/", async (req, res) => {
  const { titulo, fecha, contenido, enlace, categoria } = req.body;
  if (!titulo || !fecha) return res.status(400).json({ error: "El título y la fecha son obligatorios" });
  try {
    const resultado = await conexion.query(
      "INSERT INTO noticias (titulo, fecha, contenido, enlace, categoria) VALUES ($1, $2, $3, $4, $5) RETURNING id",
      [titulo, fecha, contenido, enlace, categoria ?? "General"]
    );
    res.status(201).json({ mensaje: "Noticia creada correctamente", id: resultado.rows[0].id });
  } catch (error) {
    console.error("Error al crear la noticia:", error);
    res.status(500).json({ error: "Error al crear la noticia" });
  }
});

// PUT /api/noticias/:id
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { titulo, fecha, contenido, enlace, categoria } = req.body;
  if (!titulo || !fecha) return res.status(400).json({ error: "El título y la fecha son obligatorios" });
  try {
    const resultado = await conexion.query(
      "UPDATE noticias SET titulo = $1, fecha = $2, contenido = $3, enlace = $4, categoria = $5 WHERE id = $6",
      [titulo, fecha, contenido, enlace, categoria ?? "General", id]
    );
    if (resultado.rowCount === 0) return res.status(404).json({ error: "Noticia no encontrada" });
    res.json({ mensaje: "Noticia actualizada correctamente" });
  } catch (error) {
    console.error("Error al editar la noticia:", error);
    res.status(500).json({ error: "Error al editar la noticia" });
  }
});

// DELETE /api/noticias/:id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await conexion.query(
      "DELETE FROM noticias WHERE id = $1",
      [id]
    );
    if (resultado.rowCount === 0) return res.status(404).json({ error: "Noticia no encontrada" });
    res.json({ mensaje: "Noticia eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar la noticia:", error);
    res.status(500).json({ error: "Error al eliminar la noticia" });
  }
});

module.exports = router;
const express  = require("express");
const router   = express.Router();
const conexion = require("../config/db");

// GET /api/noticias
router.get("/", (req, res) => {
  const limite = parseInt(req.query.limite) || 3;
  conexion.query(
    "SELECT id, titulo, fecha, enlace, categoria FROM noticias ORDER BY fecha DESC LIMIT ?",
    [limite],
    (error, resultados) => {
      if (error) return res.status(500).json({ error: "Error al obtener las noticias" });
      res.json(resultados);
    }
  );
});

// GET /api/noticias/:id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  conexion.query(
    "SELECT id, titulo, fecha, contenido, enlace, categoria FROM noticias WHERE id = ?",
    [id],
    (error, resultados) => {
      if (error) return res.status(500).json({ error: "Error al obtener la noticia" });
      if (resultados.length === 0) return res.status(404).json({ error: "Noticia no encontrada" });
      res.json(resultados[0]);
    }
  );
});

// POST /api/noticias
router.post("/", (req, res) => {
  const { titulo, fecha, contenido, enlace, categoria } = req.body;
  if (!titulo || !fecha) return res.status(400).json({ error: "El título y la fecha son obligatorios" });
  conexion.query(
    "INSERT INTO noticias (titulo, fecha, contenido, enlace, categoria) VALUES (?, ?, ?, ?, ?)",
    [titulo, fecha, contenido, enlace, categoria ?? "General"],
    (error, resultado) => {
      if (error) return res.status(500).json({ error: "Error al crear la noticia" });
      res.status(201).json({ mensaje: "Noticia creada correctamente", id: resultado.insertId });
    }
  );
});

// PUT /api/noticias/:id
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { titulo, fecha, contenido, enlace, categoria } = req.body;
  if (!titulo || !fecha) return res.status(400).json({ error: "El título y la fecha son obligatorios" });
  conexion.query(
    "UPDATE noticias SET titulo = ?, fecha = ?, contenido = ?, enlace = ?, categoria = ? WHERE id = ?",
    [titulo, fecha, contenido, enlace, categoria ?? "General", id],
    (error, resultado) => {
      if (error) return res.status(500).json({ error: "Error al editar la noticia" });
      if (resultado.affectedRows === 0) return res.status(404).json({ error: "Noticia no encontrada" });
      res.json({ mensaje: "Noticia actualizada correctamente" });
    }
  );
});

// DELETE /api/noticias/:id
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  conexion.query(
    "DELETE FROM noticias WHERE id = ?",
    [id],
    (error, resultado) => {
      if (error) return res.status(500).json({ error: "Error al eliminar la noticia" });
      if (resultado.affectedRows === 0) return res.status(404).json({ error: "Noticia no encontrada" });
      res.json({ mensaje: "Noticia eliminada correctamente" });
    }
  );
});

module.exports = router;
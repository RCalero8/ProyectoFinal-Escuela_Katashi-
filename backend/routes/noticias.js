const express = require("express");
const router = express.Router();
const conexion = require("../config/db");

// GET /api/noticias - Obtener noticias con filtros dinámicos
router.get("/", async (req, res) => {
  const { titulo, categoria, orden } = req.query;
  const limite = parseInt(req.query.limite, 10) || 10;
  
  let query = "SELECT id, titulo, fecha, enlace, categoria FROM noticias WHERE 1=1";
  let params = [];
  let paramIndex = 1;

  if (titulo) {
    query += ` AND titulo ILIKE $${paramIndex}`;
    params.push(`%${titulo}%`);
    paramIndex++;
  }

  if (categoria && categoria !== "Categorias") {
    query += ` AND categoria = $${paramIndex}`;
    params.push(categoria);
    paramIndex++;
  }

  const sortOrder = orden === "Mas Antiguo" ? "ASC" : "DESC";
  query += ` ORDER BY fecha ${sortOrder} LIMIT $${paramIndex}`;
  params.push(limite);

  try {
    const resultado = await conexion.query(query, params);
    res.json(resultado.rows);
  } catch (error) {
    console.error("Error al obtener las noticias:", error);
    res.status(500).json({ error: "Error al obtener las noticias" });
  }
});

// GET /api/noticias/categorias - Obtener TODAS las categorías únicas de la BD
router.get("/categorias", async (req, res) => {
  try {
    // Obtenemos todas las categorías únicas que no sean nulas ni vacías
    const resultado = await conexion.query(
      "SELECT DISTINCT categoria FROM noticias WHERE categoria IS NOT NULL AND categoria <> '' ORDER BY categoria ASC"
    );
    const categorias = resultado.rows.map(r => r.categoria);
    console.log("Categorías encontradas en la BD:", categorias); // Log para depuración
    res.json(categorias);
  } catch (error) {
    console.error("Error al obtener las categorías:", error);
    res.status(500).json({ error: "Error al obtener las categorías" });
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

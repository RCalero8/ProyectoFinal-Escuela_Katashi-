const express = requiere('express');
const router = express.Router();
const pool = requiere('../config/db');

//---Alumnos---
router.get('/alumnos', async (req, res) => {
  try {
    const r = await pool.query(
      `SELECT a.id_alumno, a.dni, a.nombre, a.apellido, a.f_nacimiento, a.nivel,
              u.email, u.metodo_pago
       FROM alumno a
       LEFT JOIN usuario u ON a.id_usuario = u.id_usuario
       ORDER BY a.id_alumno ASC`
    );
    res.json(r.rows);
  } catch (e) { console.error(e); res.status(500).json({ error: "Error al obtener alumnos" }); }
});
 
router.put('/alumnos/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, dni, nivel } = req.body;
  try {
    await pool.query(
      `UPDATE alumno SET nombre=$1, apellido=$2, dni=$3, nivel=$4 WHERE id_alumno=$5`,
      [nombre, apellido, dni, nivel, id]
    );
    res.json({ mensaje: "Alumno actualizado" });
  } catch (e) { console.error(e); res.status(500).json({ error: "Error al actualizar alumno" }); }
});
//---Pagos---
router.get('/pagos', async (req, res) => {
  try {
    const r = await pool.query(
      `SELECT p.id_pago, p.tipo, p.precio, p.f_pago, p.estado,
              u.nombre, u.apellido
       FROM pagos p
       LEFT JOIN usuario u ON p.id_usuario = u.id_usuario
       ORDER BY p.f_pago DESC`
    );
    res.json(r.rows);
  } catch (e) { console.error(e); res.status(500).json({ error: "Error al obtener pagos" }); }
});
 
router.put('/pagos/:id', async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;
  try {
    await pool.query(
      `UPDATE pagos SET estado=$1 WHERE id_pago=$2`,
      [estado, id]
    );
    res.json({ mensaje: "Pago actualizado" });
  } catch (e) { console.error(e); res.status(500).json({ error: "Error al actualizar pago" }); }
});
//---Horarios---
router.get('/horarios', async (req, res) => {
  try {
    const r = await pool.query(
      `SELECT h.id_horario, h.dia, h.hora, h.tipo_clase, h.dojo,
              u.nombre AS alumno_nombre, u.apellido AS alumno_apellido,
              s.nombre AS sensei_nombre
       FROM horario h
       LEFT JOIN usuario u ON h.id_usuario = u.id_usuario
       LEFT JOIN usuario s ON h."Sensei" = s.id_usuario
       ORDER BY CASE h.dia
         WHEN 'Lunes' THEN 1 WHEN 'Martes' THEN 2 WHEN 'Miércoles' THEN 3
         WHEN 'Jueves' THEN 4 WHEN 'Viernes' THEN 5 WHEN 'Sábado' THEN 6 ELSE 7 END, h.hora`
    );
    res.json(r.rows);
  } catch (e) { console.error(e); res.status(500).json({ error: "Error al obtener horarios" }); }
});
 
router.post('/horarios', async (req, res) => {
  const { dia, hora, tipo_clase, dojo, id_usuario, sensei } = req.body;
  try {
    await pool.query(
      `INSERT INTO horario (dia, hora, tipo_clase, dojo, id_usuario, "Sensei") VALUES ($1,$2,$3,$4,$5,$6)`,
      [dia, hora, tipo_clase, dojo, id_usuario, sensei]
    );
    res.status(201).json({ mensaje: "Horario creado" });
  } catch (e) { console.error(e); res.status(500).json({ error: "Error al crear horario" }); }
});
 
router.delete('/horarios/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query(`DELETE FROM horario WHERE id_horario=$1`, [id]);
    res.json({ mensaje: "Horario eliminado" });
  } catch (e) { console.error(e); res.status(500).json({ error: "Error al eliminar horario" }); }
});
 
//---Asistencia---
router.get('/asistencia/:id_horario/:fecha', async (req, res) => {
  const { id_horario, fecha } = req.params;
  try {
    // Obtener todos los alumnos de ese horario
    const alumnos = await pool.query(
      `SELECT u.id_usuario, u.nombre, u.apellido
       FROM horario h
       JOIN usuario u ON h.id_usuario = u.id_usuario
       WHERE h.id_horario = $1`, [id_horario]
    );
    // Para cada alumno ver si tiene asistencia ese día
    const lista = await Promise.all(alumnos.rows.map(async (a: any) => {
      const asist = await pool.query(
        `SELECT id_asistencia, presente FROM asistencia WHERE id_usuario=$1 AND id_clase=$2 AND fecha=$3`,
        [a.id_usuario, id_horario, fecha]
      );
      return {
        ...a,
        id_asistencia: asist.rows[0]?.id_asistencia || null,
        presente:      asist.rows[0]?.presente ?? null,
      };
    }));
    res.json(lista);
  } catch (e) { console.error(e); res.status(500).json({ error: "Error al obtener asistencia" }); }
});
 
router.post('/asistencia', async (req, res) => {
  const { id_usuario, id_horario, fecha, presente } = req.body;
  try {
    await pool.query(
      `INSERT INTO asistencia (id_usuario, id_clase, fecha, presente)
       VALUES ($1,$2,$3,$4)
       ON CONFLICT (id_usuario, id_clase, fecha) DO UPDATE SET presente=$4`,
      [id_usuario, id_horario, fecha, presente]
    );
    res.json({ mensaje: "Asistencia guardada" });
  } catch (e) { console.error(e); res.status(500).json({ error: "Error al guardar asistencia" }); }
});
 
//---Noticias---
router.get('/noticias', async (req, res) => {
  try {
    const r = await pool.query(`SELECT * FROM noticias ORDER BY fecha DESC`);
    res.json(r.rows);
  } catch (e) { console.error(e); res.status(500).json({ error: "Error al obtener noticias" }); }
});
 
router.post('/noticias', async (req, res) => {
  const { titulo, contenido, categoria, fecha, enlace } = req.body;
  try {
    await pool.query(
      `INSERT INTO noticias (titulo, contenido, categoria, fecha, enlace) VALUES ($1,$2,$3,$4,$5)`,
      [titulo, contenido, categoria, fecha, enlace]
    );
    res.status(201).json({ mensaje: "Noticia creada" });
  } catch (e) { console.error(e); res.status(500).json({ error: "Error al crear noticia" }); }
});
 
router.put('/noticias/:id', async (req, res) => {
  const { id } = req.params;
  const { titulo, contenido, categoria, fecha, enlace } = req.body;
  try {
    await pool.query(
      `UPDATE noticias SET titulo=$1, contenido=$2, categoria=$3, fecha=$4, enlace=$5 WHERE id=$6`,
      [titulo, contenido, categoria, fecha, enlace, id]
    );
    res.json({ mensaje: "Noticia actualizada" });
  } catch (e) { console.error(e); res.status(500).json({ error: "Error al actualizar noticia" }); }
});
 
router.delete('/noticias/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query(`DELETE FROM noticias WHERE id=$1`, [id]);
    res.json({ mensaje: "Noticia eliminada" });
  } catch (e) { console.error(e); res.status(500).json({ error: "Error al eliminar noticia" }); }
});
 
//---Tienda---
router.get('/tienda', async (req, res) => {
  try {
    const r = await pool.query(`SELECT * FROM material ORDER BY id_material ASC`);
    res.json(r.rows);
  } catch (e) { console.error(e); res.status(500).json({ error: "Error al obtener productos" }); }
});
 
router.post('/tienda', async (req, res) => {
  const { nombre, descripcion, precio, stock, Categoria, Imagen, Talla, Color } = req.body;
  try {
    await pool.query(
      `INSERT INTO material (nombre, descripcion, precio, stock, "Categoria", "Imagen", "Talla", "Color")
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
      [nombre, descripcion, precio, stock, Categoria, Imagen, Talla, Color]
    );
    res.status(201).json({ mensaje: "Producto creado" });
  } catch (e) { console.error(e); res.status(500).json({ error: "Error al crear producto" }); }
});
 
router.put('/tienda/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, precio, stock, Categoria, Imagen, Talla, Color } = req.body;
  try {
    await pool.query(
      `UPDATE material SET nombre=$1, descripcion=$2, precio=$3, stock=$4,
       "Categoria"=$5, "Imagen"=$6, "Talla"=$7, "Color"=$8 WHERE id_material=$9`,
      [nombre, descripcion, precio, stock, Categoria, Imagen, Talla, Color, id]
    );
    res.json({ mensaje: "Producto actualizado" });
  } catch (e) { console.error(e); res.status(500).json({ error: "Error al actualizar producto" }); }
});
 
router.delete('/tienda/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query(`DELETE FROM material WHERE id_material=$1`, [id]);
    res.json({ mensaje: "Producto eliminado" });
  } catch (e) { console.error(e); res.status(500).json({ error: "Error al eliminar producto" }); }
});
 
module.exports = router;

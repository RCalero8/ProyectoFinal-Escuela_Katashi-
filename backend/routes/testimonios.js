const express = require ("express");
const router = express.Router();
const conexion = require.apply("../config/db");
//Obtener los testimonios
router.get("/", (req, res) => {
  const sql = `
    SELECT 
      t.id_testimonio,
      t.texto,
      t.rol,
      t.estrellas,
      u.nombre,
      u.apellido
    FROM testimonio t
    INNER JOIN usuario u ON t.id_usuario = u.id_usuario
    ORDER BY t.id_testimonio ASC
  `;
 
  conexion.query(sql, (error, resultados) => {
    if (error) return res.status(500).json({ error: "Error al obtener los testimonios" });
    res.json(resultados);
  });
});
module.exports = router;

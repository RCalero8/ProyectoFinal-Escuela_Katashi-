const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Obtener la información completa de federación por ID de usuario
router.get('/usuario/:id_usuario', async (req, res) => {
    const { id_usuario } = req.params;

    try {
        const query = `
            SELECT 
                u.nombre AS nombre_usuario, 
                u.apellido AS apellido_usuario,
                a.dni, 
                a.nivel,
                f.n_licencia, 
                f.categoria, 
                f.f_alta, 
                f.f_renovacion, 
                f.resultados_competic,
                f.documentos
            FROM usuario u
            JOIN alumno a ON u.id_usuario = a.id_usuario
            LEFT JOIN federacion f ON a.id_alumno = f.id_alumno
            WHERE u.id_usuario = $1
        `;

        const resultado = await pool.query(query, [id_usuario]);

        if (resultado.rows.length === 0) {
            return res.status(404).json({ mensaje: "No se encontraron datos para este usuario" });
        }

        res.json(resultado.rows);
    } catch (error) {
        console.error("Error en el servidor:", error);
        res.status(500).json({ error: "Error al obtener datos federativos" });
    }
});

module.exports = router;
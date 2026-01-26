const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
    try {
        const query = `
            SELECT c.id_curso, c.nombre, c.precio, cl.grado 
            FROM CURSO c
            LEFT JOIN CLASE cl ON c.id_curso = cl.id_curso
        `;
        const [rows] = await db.query(query);
        res.json(rows);
    } catch (error) {
        console.error("Error en la DB:", error);
        res.status(500).json({ error: "Error al obtener cursos" });
    }
});

module.exports = router;
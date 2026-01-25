const express = require('express');
const router = express.Router();
const db = require('../db'); // Importa tu conexión de db.js

// Ruta para obtener todos los cursos
router.get('/', async (req, res) => {
    try {
        // Hacemos un JOIN para traer el nombre del curso y su grado correspondiente
        const query = `
            SELECT c.id_curso, c.nombre, c.precio, cl.grado 
            FROM CURSO c
            LEFT JOIN CLASE cl ON c.id_curso = cl.id_curso
        `;
        
        const [rows] = await db.query(query);
        res.json(rows);
    } catch (error) {
        console.error("Error al obtener cursos:", error);
        res.status(500).send("Error del servidor");
    }
});

module.exports = router;
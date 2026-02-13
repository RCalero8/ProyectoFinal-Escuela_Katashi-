const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
    try {
       const query = `
        SELECT U.nombre, U.apellido, I.dan, I.rol_web, I.biografia
        FROM USUARIO U
        INNER JOIN INFO_SENSEI I ON U.id_usuario = I.id_usuario
        WHERE I.biografia IS NOT NULL; -- Filtro extra de seguridad
       `;
        const [rows] = await db.query(query);
        res.json(rows);
    } catch (error) {
        console.error("Error en la DB:", error);
        res.status(500).json({ error: "Error al obtener senseis" });
    }
});

module.exports = router;
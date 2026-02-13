const express = require('express');
const cors = require('cors'); // Asegúrate de ejecutar: npm install cors
const db = require('./db');
require('dotenv').config();

const app = express();

// 1. IMPORTAR RUTAS
const cursosRoutes = require('./routes/cursos');
const senseisRoutes = require('./routes/senseis');
// 2. MIDDLEWARES (CORS debe ir siempre antes que las rutas)
app.use(cors()); 
app.use(express.json());

// 3. DEFINIR RUTAS
app.use('/api/cursos', cursosRoutes);
app.use('/api/senseis', senseisRoutes);

// Ruta de prueba para verificar la base de datos
app.get('/prueba-db', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT 1');
        res.json({ mensaje: "Conexión exitosa a MySQL", data: rows });
    } catch (error) {
        res.status(500).json({ error: "Error de conexión a la base de datos" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
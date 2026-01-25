const express = require('express');
const cors = require('cors'); //
const app = express();

app.use(cors()); // Esto permite que el frontend se conecte
app.use(express.json());

// Todas las rutas dentro de cursos.js funcionarán bajo /api/cursos
app.use('/api/cursos', cursosRoutes);

// Tu ruta de prueba se mantiene igual
app.get('/prueba-db', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT 1');
        res.json({ mensaje: "Conexión exitosa a MySQL", data: rows });
    } catch (error) {
        res.status(500).json({ error: "Error de conexión" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
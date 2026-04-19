require("dotenv").config();
const express = require("express");
const cors    = require("cors");
const conexion = require("./config/db");  

const rutasNoticias = require("./routes/noticias");
const rutasCurso = require("./routes/cursos");
const rutasClases = require("./routes/clases");
const rutasSenseis = require("./routes/senseis");
const rutasTestimonios = require("./routes/testimonios");
const rutasMaterial = require("./routes/material");
const app = express();
const rutasAuth = require("./routes/auth");

// Configuración de CORS mejorada para Vercel
app.use(cors()); 
app.use(express.json());

// Rutas
app.use("/api/noticias", rutasNoticias);
app.use("/api/clases", rutasClases);
app.use("/api/cursos", rutasCurso);
app.use("/api/senseis", rutasSenseis);
app.use("/api/testimonios", rutasTestimonios);
app.use("/api/material", rutasMaterial);
app.use("/api/auth", rutasAuth);

// Ruta de prueba para saber si el backend responde
app.get("/", (req, res) => {
  res.send("Servidor de la Escuela Katashi funcionando 🥋");
});

const PUERTO = process.env.PORT || 3000;
app.listen(PUERTO, () => {
  console.log(`Servidor corriendo correctamente`);
});
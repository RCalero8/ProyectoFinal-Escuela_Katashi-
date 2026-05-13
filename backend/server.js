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
const rutasAuth = require("./routes/auth"); 
const rutasRegistro = require("./routes/registro");
const rutasHorario = require("./routes/Horario");
const rutasAsistencia = require ("./routes/asistencia");
const rutasInscripciones = require ("./routes/incripsiones");
const rutasPagos = require("./routes/pagos");
<<<<<<< HEAD
const rutaFederacion = require ("./routes/federacion");
=======
const rutasFederacion = require("./routes/federacion");
>>>>>>> 7a52eddfc18bd902bca50911ce36c6b42dbb1cb8
const app = express();

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
app.use("/api/registro", rutasRegistro);
app.use("/api/horario", rutasHorario);
app.use("/api/asistencia", rutasAsistencia);
app.use("/api/inscripciones", rutasInscripciones);
app.use("/api/pagos", rutasPagos);
<<<<<<< HEAD
app.use('/api/federacion', rutaFederacion);
=======
app.use("/api/federacion", rutasFederacion);
>>>>>>> 7a52eddfc18bd902bca50911ce36c6b42dbb1cb8

// Ruta de prueba para saber si el backend responde
app.get("/", (req, res) => {
  res.send("Servidor de la Escuela Katashi funcionando 🥋");
});

const PUERTO = process.env.PORT || 3000;
app.listen(PUERTO, () => {
  console.log(`Servidor corriendo correctamente`);
});

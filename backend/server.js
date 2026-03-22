require("dotenv").config();
const express = require("express");
const cors    = require("cors");
const conexion = require("./config/db");  

const rutasNoticias = require("./routes/noticias");
const rutasCurso = require("./routes/cursos");
const rutasClases = require("./routes/clases");
const rutasSenseis = require("./routes/senseis");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/noticias", rutasNoticias);
app.use("/api/clases", rutasClases);
app.use("/api/cursos", rutasCurso);
app.use("/api/senseis", rutasSenseis);

const PUERTO = process.env.PORT || 3000;
app.listen(PUERTO, () => {
  console.log(`Servidor corriendo en http://localhost:${PUERTO}`);
});
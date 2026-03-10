const express = require("express");
const cors    = require("cors");
require("dotenv").config();

const rutasNoticias = require("./routes/noticias");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/noticias", rutasNoticias);

const PUERTO = process.env.PORT || 3000;
app.listen(PUERTO, () => {
  console.log(`Servidor corriendo en http://localhost:${PUERTO}`);
});
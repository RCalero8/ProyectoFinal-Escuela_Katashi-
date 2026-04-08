const { Pool } = require("pg"); // Usamos pg porque Supabase es PostgreSQL
require("dotenv").config();

// Creamos la conexión usando la URL larga que pegamos en Render
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Obligatorio para conectar con Supabase desde Render
  },
});

// Verificar conexión al arrancar (igual que lo tenías)
pool.connect((error, client, release) => {
  if (error) {
    console.error("Error al conectar con Supabase (Postgres):", error.message);
    return;
  }
  console.log("Conectado a Supabase correctamente 🥋");
  release();
});

module.exports = pool;
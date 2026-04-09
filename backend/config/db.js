const { Pool } = require("pg");
require("dotenv").config();

if (!process.env.DATABASE_URL) {
  console.error("❌ Falta la variable DATABASE_URL en el entorno");
  process.exit(1);
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Necesario para Supabase / Render
  },
});

pool.connect((error, client, release) => {
  if (error) {
    console.error("Error al conectar con la base de datos:", error.message);
    return;
  }
  console.log("Conectado a PostgreSQL correctamente 🥋");
  release();
});

module.exports = pool;

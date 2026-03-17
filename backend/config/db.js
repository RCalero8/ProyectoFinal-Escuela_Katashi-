const mysql = require("mysql2");
require("dotenv").config();
 
const pool = mysql.createPool({
  host:                  process.env.DB_HOST,
  user:                  process.env.DB_USER ? process.env.DB_USER.trim() : process.env.DB_USER,
  password:              process.env.DB_PASSWORD,
  database:              process.env.DB_NAME,
  port:                  parseInt(process.env.DB_PORT),
  waitForConnections:    true,
  connectionLimit:       10,
  queueLimit:            0,
  enableKeepAlive:       true,
  keepAliveInitialDelay: 0,
});
 
// Verificar conexión al arrancar
pool.getConnection((error, connection) => {
  if (error) {
    console.error("Error al conectar con MySQL:", error.message);
    return;
  }
  console.log("Conectado a MySQL correctamente (pool)");
  connection.release();
});
 
module.exports = pool;
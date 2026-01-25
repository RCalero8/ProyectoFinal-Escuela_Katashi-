const mysql = require('mysql2');
require('dotenv').config();

// Creamos un "pool" de conexiones (más eficiente que una conexión única)
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Exportamos la versión de promesas para usar async/await
module.exports = pool.promise();
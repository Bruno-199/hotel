// Importo mysql
const mysql = require("mysql2");

// Configuración base de datos local
const localConnection = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "hotel1"
});

// Configuración base de datos en Railway
const cloudConnection = mysql.createPool({
    host: "centerbeam.proxy.rlwy.net",
    port: 12609,
    user: "root",
    password: "aVZSXKogFrLMFhDHYQjmmftszuXXswms",
    database: "railway"
});

// Por defecto usamos la conexión local
// Para cambiar a la nube, simplemente cambia localConnection por cloudConnection
module.exports = {
    conection: cloudConnection
};

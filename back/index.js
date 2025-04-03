const express = require("express");
const cors = require("cors");
const { conection } = require("./config/db");

// Importación de rutas
const habitacionesRoutes = require("./routes/habitaciones");
const imagenesRoutes = require("./routes/imagenes");
const reservasRoutes = require("./routes/reservas");
const loginRoutes = require("./routes/admin");

// Inicialización de la app
const app = express();
const port = process.env.PORT || 8000;

// Middlewares
app.use(express.json());
app.use(cors());

// Rutas
app.get("/", (req, res) => {
  res.send({ message: "Bienvenido a mi API" });
});

// Rutas modulares
app.use("/", habitacionesRoutes);
app.use("/", imagenesRoutes);
app.use("/", reservasRoutes);
app.use("/", loginRoutes);

// Conexión a la base de datos
conection.connect((err) => {
  if (err) {
    console.error("Error al conectar a la base de datos:", err);
    return;
  }
  console.log("Conectado exitosamente a la base de datos");
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});

// Manejo de errores
process.on("unhandledRejection", (err) => {
  console.log("Error:", err);
  process.exit(1);
});

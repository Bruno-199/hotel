const express = require("express");
const {
  todo_habitaciones,
  agregar_habitacion,
  borrar_habitacion,
  editar_habitacion,
  ver_habitacion,
} = require("../controllers/habitaciones");

const router = express.Router();

router.get("/habitaciones", todo_habitaciones);
router.post("/habitaciones/agregar", agregar_habitacion);
router.delete("/habitaciones/eliminar/:id", borrar_habitacion);
router.put("/habitaciones/editar/:id", editar_habitacion);
router.get("/habitaciones/:id", ver_habitacion);

module.exports = router;
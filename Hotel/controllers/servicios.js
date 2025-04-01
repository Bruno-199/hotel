const express = require("express");
const {
  agregar_servicio,
  obtener_servicios,
  agregar_imagen_servicio,
  borrar_imagen_servicio,
} = require("../controllers/servicios");

const router = express.Router();

router.post("/servicios/agregar", agregar_servicio);
router.get("/servicios", obtener_servicios);
router.post("/servicios/imagenes/agregar", agregar_imagen_servicio);
router.delete("/servicios/imagenes/eliminar/:id", borrar_imagen_servicio);

module.exports = router;
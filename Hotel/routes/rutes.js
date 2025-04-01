const express = require("express");
const {
  agregar_servicio,
  obtener_servicios,
  obtener_servicio_por_id,
  actualizar_servicio,
  borrar_servicio,
  agregar_imagen_servicio,
  borrar_imagen_servicio,
} = require("../controllers/servicios");

const router = express.Router();

router.post("/servicios/agregar", agregar_servicio);
router.get("/servicios", obtener_servicios);
router.get("/servicios/:id", obtener_servicio_por_id);
router.put("/servicios/actualizar/:id", actualizar_servicio);
router.delete("/servicios/eliminar/:id", borrar_servicio);

router.post("/servicios/imagenes/agregar", agregar_imagen_servicio);
router.delete("/servicios/imagenes/eliminar/:id", borrar_imagen_servicio);

module.exports = router;

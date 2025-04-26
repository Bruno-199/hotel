const express = require("express");
const {
  agregar_imagen,
  borrar_imagen,
} = require("../controllers/imagenes");

const router = express.Router();

router.post("/imagenes/agregar", agregar_imagen);
router.delete("/imagenes/eliminar/:id", borrar_imagen);

module.exports = router;
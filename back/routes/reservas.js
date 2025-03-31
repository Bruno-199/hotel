const express = require("express");
const {
  todo_reservas,
  agregar_reserva,
  borrar_reserva,
  editar_reserva,
  ver_reserva,
  cambiar_estado_reserva
} = require("../controllers/reservas");

const router = express.Router();

router.get("/reservas", todo_reservas);
router.post("/reservas/agregar", agregar_reserva);
router.delete("/reservas/eliminar/:id", borrar_reserva);
router.put("/reservas/editar/:id", editar_reserva);
router.get("/reservas/:id", ver_reserva);
router.put("/reservas/cambiar_estado/:id", cambiar_estado_reserva);

module.exports = router;
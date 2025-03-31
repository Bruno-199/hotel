const { conection } = require("../config/db");

const todo_reservas = (req, res) => {
  const query = `SELECT * FROM reservas`;

  conection.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

const agregar_reserva = (req, res) => {
  const { id_habitacion, nombre, telefono, dni, fecha_entrada, fecha_salida } = req.body;

  const query = `INSERT INTO reservas 
                 (id_habitacion, nombre, telefono, dni, fecha_entrada, fecha_salida) 
                 VALUES (?, ?, ?, ?, ?, ?)`;

  conection.query(
    query, 
    [id_habitacion, nombre, telefono, dni, fecha_entrada, fecha_salida],
    (err, results) => {
      if (err) throw err;
      res.send(results);
    }
  );
};

const borrar_reserva = (req, res) => {
  const id = req.params.id;

  const query = `DELETE FROM reservas WHERE id_reserva = ?`;

  conection.query(query, [id], (err, results) => {
    if (err) throw err;
    res.json({ message: "Reserva eliminada correctamente" });
  });
};

const editar_reserva = (req, res) => {
  const id = req.params.id;
  const { id_habitacion, nombre, telefono, dni, fecha_entrada, fecha_salida, estado } = req.body;

  const query = `UPDATE reservas 
                 SET id_habitacion = ?, 
                     nombre = ?, 
                     telefono = ?, 
                     dni = ?, 
                     fecha_entrada = ?, 
                     fecha_salida = ?,
                     estado = ? 
                 WHERE id_reserva = ?`;

  conection.query(
    query, 
    [id_habitacion, nombre, telefono, dni, fecha_entrada, fecha_salida, estado, id], 
    (err, results) => {
      if (err) throw err;
      res.send(results);
    }
  );
};

const ver_reserva = (req, res) => {
  const id = req.params.id;

  const query = `SELECT * FROM reservas WHERE id_reserva = ?`;

  conection.query(query, [id], (err, results) => {
    if (err) throw err;
    res.json(results[0]);
  });
};

const cambiar_estado_reserva = (req, res) => {
  const id = req.params.id;
  const { estado } = req.body;

  const query = `UPDATE reservas SET estado = ? WHERE id_reserva = ?`;

  conection.query(query, [estado, id], (err, results) => {
    if (err) throw err;
    res.json({ message: `Estado de reserva actualizado a ${estado}` });
  });
};

module.exports = {
  todo_reservas,
  agregar_reserva,
  borrar_reserva,
  editar_reserva,
  ver_reserva,
  cambiar_estado_reserva
};
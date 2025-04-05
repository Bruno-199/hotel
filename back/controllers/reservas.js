const { conection } = require("../config/db");

const todo_reservas = (req, res) => {
  const query = `
    SELECT r.*, h.numero as numero_habitacion 
    FROM reservas r 
    INNER JOIN habitaciones h ON r.id_habitacion = h.id_habitacion
  `;
  
  conection.query(query, (err, results) => {
    if (err) {
      console.error("Error al obtener reservas:", err);
      return res.status(500).json({ error: "Error al obtener reservas" });
    }
    
    // Asegurarnos de que cada reserva tenga un estado
    const reservasConEstado = results.map(reserva => ({
      ...reserva,
      estado: reserva.estado || 'pendiente'
    }));
    
    res.json(reservasConEstado);
  });
};

// En el controlador de reservas (back)
const agregar_reserva = (req, res) => {
  const { id_habitacion, nombre, telefono, dni, fecha_entrada, fecha_salida, estado } = req.body;

  const query = `INSERT INTO reservas 
                 (id_habitacion, nombre, telefono, dni, fecha_entrada, fecha_salida, estado) 
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;

  conection.query(query, 
    [id_habitacion, nombre, telefono, dni, fecha_entrada, fecha_salida, estado || 'pendiente'], 
    (err, results) => {
      if (err) {
        // Verificar si es el error del trigger
        if (err.code === 'ERR_SIGNAL_MESSAGE') {
          return res.status(400).json({ 
            error: "No se puede reservar una habitación en mantenimiento" 
          });
        }
        return res.status(500).json({ error: "Error al crear la reserva" });
      }
      res.status(201).json({
        success: true,
        message: "Reserva creada exitosamente",
        id: results.insertId
      });
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
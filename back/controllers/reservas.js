const { conection } = require("../config/db");

// Función auxiliar para actualizar el estado de la habitación
const actualizarEstadoHabitacion = (idHabitacion, callback) => {
  const query = `
    UPDATE habitaciones 
    SET estado = CASE 
      WHEN EXISTS (
        SELECT 1 FROM reservas 
        WHERE id_habitacion = ? 
        AND estado = 'confirmada'
        AND CURDATE() BETWEEN fecha_entrada AND fecha_salida
      ) THEN 'ocupada'
      ELSE 'disponible'
    END
    WHERE id_habitacion = ? AND estado != 'mantenimiento'
  `;
  
  conection.query(query, [idHabitacion, idHabitacion], callback);
};

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
    (err, results) => {      if (err) {
        console.error('Error al crear reserva:', err);
        // Manejar errores específicos de los triggers
        if (err.code === '45000' || err.code === 'ER_SIGNAL_EXCEPTION') {
          return res.status(400).json({ 
            error: err.sqlMessage || err.message || "Error en la validación de la reserva"
          });
        }
        return res.status(500).json({ error: "Error al crear la reserva" });
      }
      
      // Actualizar el estado de la habitación después de crear la reserva
      actualizarEstadoHabitacion(id_habitacion, (updateErr) => {
        if (updateErr) {
          console.error('Error al actualizar estado de habitación:', updateErr);
        }
      });

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
  let oldIdHabitacion;

  // Primero obtener la habitación anterior
  conection.query('SELECT id_habitacion FROM reservas WHERE id_reserva = ?', [id], (err, results) => {
    if (err) {
      console.error('Error al obtener reserva anterior:', err);
      return res.status(500).json({ error: "Error al actualizar la reserva" });
    }

    oldIdHabitacion = results[0]?.id_habitacion;

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
      (err, results) => {        if (err) {
          console.error('Error al actualizar reserva:', err);
          // Manejar errores específicos de los triggers
          if (err.code === '45000' || err.code === 'ER_SIGNAL_EXCEPTION') {
            return res.status(400).json({ 
              error: err.sqlMessage || err.message || "Error en la validación de la reserva"
            });
          }
          return res.status(500).json({ error: "Error al actualizar la reserva" });
        }

        // Actualizar estado de ambas habitaciones si es necesario
        actualizarEstadoHabitacion(id_habitacion, (updateErr) => {
          if (updateErr) {
            console.error('Error al actualizar estado de habitación nueva:', updateErr);
          }
          
          if (oldIdHabitacion && oldIdHabitacion !== id_habitacion) {
            actualizarEstadoHabitacion(oldIdHabitacion, (updateErr) => {
              if (updateErr) {
                console.error('Error al actualizar estado de habitación anterior:', updateErr);
              }
            });
          }
        });

        res.json({
          success: true,
          message: "Reserva actualizada exitosamente",
          affected: results.affectedRows
        });
      }
    );
  });
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

  // Primero obtener el id_habitacion
  conection.query('SELECT id_habitacion FROM reservas WHERE id_reserva = ?', [id], (err, results) => {
    if (err) {
      console.error('Error al obtener reserva:', err);
      return res.status(500).json({ error: "Error al cambiar estado de la reserva" });
    }

    const id_habitacion = results[0]?.id_habitacion;

    const query = `UPDATE reservas SET estado = ? WHERE id_reserva = ?`;

    conection.query(query, [estado, id], (err, results) => {
      if (err) {
        console.error('Error al actualizar estado de reserva:', err);
        return res.status(500).json({ error: "Error al cambiar estado de la reserva" });
      }

      // Actualizar estado de la habitación
      actualizarEstadoHabitacion(id_habitacion, (updateErr) => {
        if (updateErr) {
          console.error('Error al actualizar estado de habitación:', updateErr);
        }
      });

      res.json({ message: `Estado de reserva actualizado a ${estado}` });
    });
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
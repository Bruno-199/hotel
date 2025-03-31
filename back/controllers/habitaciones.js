const { conection } = require("../config/db");

const todo_habitaciones = (req, res) => {
  const query = `SELECT * FROM habitaciones`;
  
  conection.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

const agregar_habitacion = (req, res) => {
  const { numero, tipo, precio, descripcion, capacidad, estado } = req.body;
  
  const query = `INSERT INTO habitaciones 
                 (numero, tipo, precio, descripcion, capacidad, estado) 
                 VALUES (?, ?, ?, ?, ?, ?)`;
  
  conection.query(query, [numero, tipo, precio, descripcion, capacidad, estado], (err, results) => {
    if (err) throw err;
    res.send(results);
  });
};

const borrar_habitacion = (req, res) => {
  const id = req.params.id;
  
  // Primero eliminamos las imágenes asociadas
  const deleteImagenesQuery = `DELETE FROM imagenes_habitaciones WHERE id_habitacion = ?`;
  
  conection.query(deleteImagenesQuery, [id], (err) => {
    if (err) {
      console.error("Error al eliminar imágenes:", err);
      return res.status(500).json({ error: "Error al eliminar imágenes" });
    }
    
    // Después eliminamos la habitación
    const deleteHabitacionQuery = `DELETE FROM habitaciones WHERE id_habitacion = ?`;
    
    conection.query(deleteHabitacionQuery, [id], (err, results) => {
      if (err) {
        console.error("Error al eliminar habitación:", err);
        return res.status(500).json({ error: "Error al eliminar habitación" });
      }
      res.json({ message: "Habitación eliminada correctamente" });
    });
  });
};

const editar_habitacion = (req, res) => {
  const id = req.params.id;
  const { numero, tipo, precio, descripcion, capacidad, estado } = req.body;
  
  const query = `UPDATE habitaciones 
                 SET numero = ?, 
                     tipo = ?, 
                     precio = ?, 
                     descripcion = ?, 
                     capacidad = ?, 
                     estado = ? 
                 WHERE id_habitacion = ?`;
  
  conection.query(query, [numero, tipo, precio, descripcion, capacidad, estado, id], (err, results) => {
    if (err) throw err;
    res.send(results);
  });
};

const ver_habitacion = (req, res) => {
  const id = req.params.id;
  
  const query = `SELECT h.*, GROUP_CONCAT(i.url_imagen_habitacion) as imagenes 
                 FROM habitaciones h 
                 LEFT JOIN imagenes_habitaciones i ON h.id_habitacion = i.id_habitacion 
                 WHERE h.id_habitacion = ?
                 GROUP BY h.id_habitacion`;
  
  conection.query(query, [id], (err, results) => {
    if (err) throw err;
    res.send(results);
  });
};

module.exports = {
  todo_habitaciones,
  agregar_habitacion,
  borrar_habitacion,
  editar_habitacion,
  ver_habitacion,
};
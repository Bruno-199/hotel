const { conection } = require("../config/db");

// Agregar un servicio
const agregar_servicio = (req, res) => {
  const { nombre, descripcion } = req.body;

  const query = `INSERT INTO servicios (nombre, descripcion) VALUES (?, ?)`;

  conection.query(query, [nombre, descripcion], (err, results) => {
    if (err) throw err;
    res.send(results);
  });
};

// Obtener todos los servicios
const obtener_servicios = (req, res) => {
  const query = `SELECT * FROM servicios`;

  conection.query(query, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
};

// Obtener un servicio por ID
const obtener_servicio_por_id = (req, res) => {
  const { id } = req.params;

  const query = `SELECT * FROM servicios WHERE id_servicio = ?`;

  conection.query(query, [id], (err, results) => {
    if (err) throw err;
    res.send(results);
  });
};

// Actualizar un servicio
const actualizar_servicio = (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion } = req.body;

  const query = `UPDATE servicios SET nombre = ?, descripcion = ? WHERE id_servicio = ?`;

  conection.query(query, [nombre, descripcion, id], (err, results) => {
    if (err) throw err;
    res.send(results);
  });
};

// Eliminar un servicio
const borrar_servicio = (req, res) => {
  const { id } = req.params;

  const query = `DELETE FROM servicios WHERE id_servicio = ?`;

  conection.query(query, [id], (err, results) => {
    if (err) throw err;
    res.send(results);
  });
};

// Agregar imagen a un servicio
const agregar_imagen_servicio = (req, res) => {
  const { id_servicio, url_imagen } = req.body;

  const query = `INSERT INTO imagenes_servicios (id_servicio, url_imagen) VALUES (?, ?)`;

  conection.query(query, [id_servicio, url_imagen], (err, results) => {
    if (err) throw err;
    res.send(results);
  });
};

// Eliminar imagen de un servicio
const borrar_imagen_servicio = (req, res) => {
  const { id } = req.params;

  const query = `DELETE FROM imagenes_servicios WHERE id_imagen = ?`;

  conection.query(query, [id], (err, results) => {
    if (err) throw err;
    res.send(results);
  });
};

module.exports = {
  agregar_servicio,
  obtener_servicios,
  obtener_servicio_por_id,
  actualizar_servicio,
  borrar_servicio,
  agregar_imagen_servicio,
  borrar_imagen_servicio,
};

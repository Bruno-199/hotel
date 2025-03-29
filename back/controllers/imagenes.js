const { conection } = require("../config/db");

const agregar_imagen = (req, res) => {
  const { id_habitacion, url_imagen_habitacion } = req.body;
  
  const query = `INSERT INTO imagenes_habitaciones 
                 (id_habitacion, url_imagen_habitacion) 
                 VALUES (?, ?)`;
  
  conection.query(query, [id_habitacion, url_imagen_habitacion], (err, results) => {
    if (err) throw err;
    res.send(results);
  });
};

const borrar_imagen = (req, res) => {
  const id = req.params.id;
  
  const query = `DELETE FROM imagenes_habitaciones 
                 WHERE id_imagen_habitacion = ?`;
  
  conection.query(query, [id], (err, results) => {
    if (err) throw err;
    res.send(results);
  });
};

module.exports = {
  agregar_imagen,
  borrar_imagen,
};
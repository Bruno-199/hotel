import React, { useState, useEffect } from 'react';
import '../css/roomManagement.css';

const RoomManagement = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    numero: '',
    piso: '',
    tipo: 'individual',
    precio: '',
    capacidad: 1,
    estado: 'disponible'  // Cambiado de booleano a string
  });
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch rooms data
  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await fetch('http://localhost:8000/habitaciones');
      const data = await response.json();
      setRooms(data);
      setLoading(false);
    } catch (error) {
      console.error('Error al cargar habitaciones:', error);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const url = isEditing 
        ? `http://localhost:8000/habitaciones/editar/${formData.id_habitacion}`
        : 'http://localhost:8000/habitaciones/agregar';
      
      const response = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          numero: parseInt(formData.numero),
          piso: parseInt(formData.piso),
          tipo: formData.tipo,
          precio: parseFloat(formData.precio),
          capacidad: parseInt(formData.capacidad),
          estado: formData.estado
        })
      });

      if (!response.ok) throw new Error('Error en la petición');

      await fetchRooms();
      resetForm();
    } catch (error) {
      console.error('Error:', error);
      alert('Error al guardar la habitación');
    }
  };

  const handleEdit = (room) => {
    setFormData({
      ...room,
      precio: room.precio.toString()
    });
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de que desea eliminar esta habitación?')) {
      try {
        const response = await fetch(`http://localhost:8000/habitaciones/eliminar/${id}`, {
          method: 'DELETE'
        });

        if (!response.ok) throw new Error('Error al eliminar');

        await fetchRooms();
      } catch (error) {
        console.error('Error:', error);
        alert('Error al eliminar la habitación');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      numero: '',
      piso: '',
      tipo: 'individual',
      precio: '',
      capacidad: 1,
      estado: 'disponible'  // Cambiado de booleano a string
    });
    setIsEditing(false);
    setShowForm(false);
  };

  const toggleAvailability = (id) => {
    const updatedRooms = rooms.map(room => 
      room.id === id ? { ...room, estado: room.estado === 'disponible' ? 'no disponible' : 'disponible' } : room
    );
    setRooms(updatedRooms);
  };

  const filteredRooms = rooms.filter(room => 
    room.numero.toString().includes(searchTerm.trim())
  );

  if (loading) {
    return <div className="loading">Cargando habitaciones...</div>;
  }

  return (
    <div className="room-management">
      <div className="room-actions">
        <button 
          className="add-room-btn"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancelar' : 'Nueva Habitación'}
        </button>
        
        <div className="room-search">
          <input 
            type="text" 
            placeholder="Buscar por número..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button><i className="fas fa-search"></i></button>
        </div>
      </div>
      
      {showForm && (
        <div className="room-form-container">
          <h3>{isEditing ? 'Editar Habitación' : 'Nueva Habitación'}</h3>
          <form onSubmit={handleSubmit} className="room-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="numero">Número</label>
                <input
                  type="text"
                  id="numero"
                  name="numero"
                  value={formData.numero}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="piso">Piso</label>
                <input
                  type="number"
                  id="piso"
                  name="piso"
                  value={formData.piso}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="tipo">Tipo</label>
                <select
                  id="tipo"
                  name="tipo"
                  value={formData.tipo}
                  onChange={handleChange}
                  required
                >
                  <option value="individual">Individual</option>
                  <option value="doble">Doble</option>
                  <option value="suite">Suite</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="capacidad">Capacidad</label>
                <input
                  type="number"
                  id="capacidad"
                  name="capacidad"
                  min="1"
                  value={formData.capacidad}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            {/* <div className="form-group">
              <label htmlFor="descripcion">Descripción</label>
              <textarea
                id="descripcion"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                required
              ></textarea>
            </div> */}
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="precio">Precio por Noche ($)</label>
                <input
                  type="number"
                  id="precio"
                  name="precio"
                  min="0"
                  value={formData.precio}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="estado">Estado</label>
                <select
                  id="estado"
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                  required
                >
                  <option value="disponible">Disponible</option>
                  <option value="ocupada">Ocupada</option>
                  <option value="mantenimiento">Mantenimiento</option>
                </select>
              </div>
            </div>
            
            <div className="form-actions">
              <button type="button" onClick={resetForm} className="cancel-btn">Cancelar</button>
              <button type="submit" className="submit-btn">
                {isEditing ? 'Actualizar' : 'Crear'} Habitación
              </button>
            </div>
          </form>
        </div>
      )}
      
      <div className="room-table-container">
        <table className="room-table">
          <thead>
            <tr>
              <th>Número</th>
              <th>Piso</th>
              <th>Tipo</th>
              <th>Capacidad</th>
              <th>Precio</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredRooms.length === 0 ? (
              <tr>
                <td colSpan="7" className="no-data">
                  {searchTerm ? 'No se encontraron habitaciones' : 'No hay habitaciones disponibles'}
                </td>
              </tr>
            ) : (
              filteredRooms.map(room => (
                <tr key={room.id_habitacion}>
                  <td>{room.numero}</td>
                  <td>{room.piso}</td>
                  <td>
                    {room.tipo 
                      ? room.tipo.charAt(0).toUpperCase() + room.tipo.slice(1)
                      : 'No especificado'
                    }
                  </td>
                  <td>{room.capacidad} personas</td>
                  <td>${room.precio}</td>
                  <td>
                    <span className={`status-badge ${room.estado || 'disponible'}`}>
                      {room.estado 
                        ? room.estado.charAt(0).toUpperCase() + room.estado.slice(1)
                        : 'Disponible'
                      }
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="edit-btn"
                        onClick={() => handleEdit(room)}
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button 
                        className="delete-btn"
                        onClick={() => handleDelete(room.id_habitacion)}
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoomManagement;
import React, { useState, useEffect } from 'react';
import '../css/roomManagement.css';

const RoomManagement = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    description: '',
    price: '',
    capacity: 1,
    beds: '',
    type: 'standard',
    available: true,
    image: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  // Fetch rooms data
  useEffect(() => {
    // In a real app, this would be an API call
    setTimeout(() => {
      const mockRooms = [
        {
          id: 1,
          name: 'Habitación Standard',
          description: 'Habitación confortable con todas las comodidades básicas para una estadía placentera.',
          price: 100,
          capacity: 2,
          beds: '1 Cama Queen',
          type: 'standard',
          available: true,
          image: '/assets/room1.jpg'
        },
        {
          id: 2,
          name: 'Habitación Deluxe',
          description: 'Espaciosa habitación con vistas a la ciudad y amenities premium.',
          price: 150,
          capacity: 2,
          beds: '1 Cama King',
          type: 'deluxe',
          available: true,
          image: '/assets/room2.jpg'
        },
        {
          id: 3,
          name: 'Suite Junior',
          description: 'Suite elegante con sala de estar separada y baño de lujo.',
          price: 200,
          capacity: 3,
          beds: '1 Cama King + 1 Sofá cama',
          type: 'suite',
          available: true,
          image: '/assets/room3.jpg'
        },
        {
          id: 4,
          name: 'Suite Familiar',
          description: 'Amplia suite ideal para familias con dos habitaciones conectadas.',
          price: 250,
          capacity: 4,
          beds: '1 Cama King + 2 Camas Twin',
          type: 'suite',
          available: false,
          image: '/assets/room4.jpg'
        }
      ];
      
      setRooms(mockRooms);
      setLoading(false);
    }, 1000);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isEditing) {
      // Update existing room
      const updatedRooms = rooms.map(room => 
        room.id === formData.id ? { ...formData, price: Number(formData.price) } : room
      );
      setRooms(updatedRooms);
    } else {
      // Add new room
      const newRoom = {
        ...formData,
        id: Date.now(), // Simple ID generation
        price: Number(formData.price)
      };
      setRooms([...rooms, newRoom]);
    }
    
    // Reset form
    resetForm();
  };

  const handleEdit = (room) => {
    setFormData({
      ...room,
      price: room.price.toString()
    });
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Está seguro de que desea eliminar esta habitación?')) {
      setRooms(rooms.filter(room => room.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      id: null,
      name: '',
      description: '',
      price: '',
      capacity: 1,
      beds: '',
      type: 'standard',
      available: true,
      image: ''
    });
    setIsEditing(false);
    setShowForm(false);
  };

  const toggleAvailability = (id) => {
    const updatedRooms = rooms.map(room => 
      room.id === id ? { ...room, available: !room.available } : room
    );
    setRooms(updatedRooms);
  };

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
          <input type="text" placeholder="Buscar habitaciones..." />
          <button><i className="fas fa-search"></i></button>
        </div>
      </div>
      
      {showForm && (
        <div className="room-form-container">
          <h3>{isEditing ? 'Editar Habitación' : 'Nueva Habitación'}</h3>
          <form onSubmit={handleSubmit} className="room-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Nombre de la Habitación</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="type">Tipo</label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                >
                  <option value="standard">Standard</option>
                  <option value="deluxe">Deluxe</option>
                  <option value="suite">Suite</option>
                </select>
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="description">Descripción</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="price">Precio por Noche ($)</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  min="0"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="capacity">Capacidad</label>
                <input
                  type="number"
                  id="capacity"
                  name="capacity"
                  min="1"
                  value={formData.capacity}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="beds">Camas</label>
                <input
                  type="text"
                  id="beds"
                  name="beds"
                  value={formData.beds}
                  onChange={handleChange}
                  required
                  placeholder="Ej: 1 Cama King"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="image">URL de la Imagen</label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  required
                  placeholder="Ej: /assets/room1.jpg"
                />
              </div>
            </div>
            
            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="available"
                  checked={formData.available}
                  onChange={handleChange}
                />
                Disponible para reservas
              </label>
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
              <th>ID</th>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Tipo</th>
              <th>Capacidad</th>
              <th>Precio</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {rooms.length === 0 ? (
              <tr>
                <td colSpan="8" className="no-data">No hay habitaciones disponibles</td>
              </tr>
            ) : (
              rooms.map(room => (
                <tr key={room.id}>
                  <td>{room.id}</td>
                  <td>
                    <div className="room-image-small">
                      <img src={room.image} alt={room.name} />
                    </div>
                  </td>
                  <td>
                    <div className="room-info">
                      <span className="room-name">{room.name}</span>
                      <span className="room-beds">{room.beds}</span>
                    </div>
                  </td>
                  <td>{room.type.charAt(0).toUpperCase() + room.type.slice(1)}</td>
                  <td>{room.capacity} personas</td>
                  <td>${room.price}</td>
                  <td>
                    <button 
                      className={`availability-toggle ${room.available ? 'available' : 'unavailable'}`}
                      onClick={() => toggleAvailability(room.id)}
                    >
                      {room.available ? 'Disponible' : 'No Disponible'}
                    </button>
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
                        onClick={() => handleDelete(room.id)}
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
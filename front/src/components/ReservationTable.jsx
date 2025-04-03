import React, { useState, useEffect } from 'react';
import '../css/reservationTable.css';

const ReservationTable = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    guestName: '',
    email: '',
    phone: '',
    roomId: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    status: 'confirmed'
  });
  const [isEditing, setIsEditing] = useState(false);
  const [rooms, setRooms] = useState([]);

  // Fetch reservations and rooms data
  useEffect(() => {
    // In a real app, this would be API calls
    setTimeout(() => {
      const mockRooms = [
        { id: 1, name: 'Habitación Standard', type: 'standard' },
        { id: 2, name: 'Habitación Deluxe', type: 'deluxe' },
        { id: 3, name: 'Suite Junior', type: 'suite' },
        { id: 4, name: 'Suite Familiar', type: 'suite' }
      ];
      
      const mockReservations = [
        {
          id: 1,
          guestName: 'Juan Pérez',
          email: 'juan@example.com',
          phone: '123-456-7890',
          roomId: 1,
          roomName: 'Habitación Standard',
          checkIn: '2023-12-10',
          checkOut: '2023-12-15',
          guests: 2,
          status: 'confirmed',
          createdAt: '2023-11-01'
        },
        {
          id: 2,
          guestName: 'María González',
          email: 'maria@example.com',
          phone: '098-765-4321',
          roomId: 3,
          roomName: 'Suite Junior',
          checkIn: '2023-12-20',
          checkOut: '2023-12-27',
          guests: 3,
          status: 'pending',
          createdAt: '2023-11-05'
        }
      ];
      
      setRooms(mockRooms);
      setReservations(mockReservations);
      setLoading(false);
    }, 1000);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isEditing) {
      // Update existing reservation
      const updatedReservations = reservations.map(res => 
        res.id === formData.id ? { ...formData, roomName: getRoomName(formData.roomId) } : res
      );
      setReservations(updatedReservations);
    } else {
      // Add new reservation
      const newReservation = {
        ...formData,
        id: Date.now(), // Simple ID generation
        roomName: getRoomName(formData.roomId),
        createdAt: new Date().toISOString().split('T')[0]
      };
      setReservations([...reservations, newReservation]);
    }
    
    // Reset form
    resetForm();
  };

  const getRoomName = (roomId) => {
    const room = rooms.find(r => r.id === parseInt(roomId));
    return room ? room.name : 'Unknown Room';
  };

  const handleEdit = (reservation) => {
    setFormData({
      ...reservation,
      roomId: reservation.roomId.toString()
    });
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Está seguro de que desea eliminar esta reservación?')) {
      setReservations(reservations.filter(res => res.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      id: null,
      guestName: '',
      email: '',
      phone: '',
      roomId: '',
      checkIn: '',
      checkOut: '',
      guests: 1,
      status: 'confirmed'
    });
    setIsEditing(false);
    setShowForm(false);
  };

  if (loading) {
    return <div className="loading">Cargando reservaciones...</div>;
  }

  return (
    <div className="reservation-management">
      <div className="reservation-actions">
        <button 
          className="add-reservation-btn"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancelar' : 'Nueva Reservación'}
        </button>
        
        <div className="reservation-search">
          <input type="text" placeholder="Buscar reservaciones..." />
          <button><i className="fas fa-search"></i></button>
        </div>
      </div>
      
      {showForm && (
        <div className="reservation-form-container">
          <h3>{isEditing ? 'Editar Reservación' : 'Nueva Reservación'}</h3>
          <form onSubmit={handleSubmit} className="reservation-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="guestName">Nombre del Huésped</label>
                <input
                  type="text"
                  id="guestName"
                  name="guestName"
                  value={formData.guestName}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Teléfono</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="roomId">Habitación</label>
                <select
                  id="roomId"
                  name="roomId"
                  value={formData.roomId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione una habitación</option>
                  {rooms.map(room => (
                    <option key={room.id} value={room.id}>
                      {room.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="checkIn">Check-in</label>
                <input
                  type="date"
                  id="checkIn"
                  name="checkIn"
                  value={formData.checkIn}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="checkOut">Check-out</label>
                <input
                  type="date"
                  id="checkOut"
                  name="checkOut"
                  value={formData.checkOut}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="guests">Número de Huéspedes</label>
                <input
                  type="number"
                  id="guests"
                  name="guests"
                  min="1"
                  value={formData.guests}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="status">Estado</label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                >
                  <option value="confirmed">Confirmada</option>
                  <option value="pending">Pendiente</option>
                  <option value="cancelled">Cancelada</option>
                  <option value="completed">Completada</option>
                </select>
              </div>
            </div>
            
            <div className="form-actions">
              <button type="button" onClick={resetForm} className="cancel-btn">Cancelar</button>
              <button type="submit" className="submit-btn">
                {isEditing ? 'Actualizar' : 'Crear'} Reservación
              </button>
            </div>
          </form>
        </div>
      )}
      
      <div className="reservation-table-container">
        <table className="reservation-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Huésped</th>
              <th>Habitación</th>
              <th>Check-in</th>
              <th>Check-out</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reservations.length === 0 ? (
              <tr>
                <td colSpan="7" className="no-data">No hay reservaciones disponibles</td>
              </tr>
            ) : (
              reservations.map(reservation => (
                <tr key={reservation.id} className={`status-${reservation.status}`}>
                  <td>{reservation.id}</td>
                  <td>
                    <div className="guest-info">
                      <span className="guest-name">{reservation.guestName}</span>
                      <span className="guest-email">{reservation.email}</span>
                    </div>
                  </td>
                  <td>{reservation.roomName}</td>
                  <td>{reservation.checkIn}</td>
                  <td>{reservation.checkOut}</td>
                  <td>
                    <span className={`status-badge ${reservation.status}`}>
                      {reservation.status === 'confirmed' && 'Confirmada'}
                      {reservation.status === 'pending' && 'Pendiente'}
                      {reservation.status === 'cancelled' && 'Cancelada'}
                      {reservation.status === 'completed' && 'Completada'}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="edit-btn"
                        onClick={() => handleEdit(reservation)}
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button 
                        className="delete-btn"
                        onClick={() => handleDelete(reservation.id)}
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

export default ReservationTable;
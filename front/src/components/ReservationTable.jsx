import React, { useState, useEffect } from 'react';
import '../css/reservationTable.css';

const ReservationTable = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    numero_habitacion: '', // Cambiar id_habitacion por numero_habitacion
    nombre: '',
    telefono: '',
    dni: '',
    fecha_entrada: '',
    fecha_salida: '',
    estado: 'pendiente'
  });
  const [isEditing, setIsEditing] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchReservations();
    fetchRooms();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await fetch('http://localhost:8000/reservas');
      const data = await response.json();
      setReservations(data);
      setLoading(false);
    } catch (error) {
      console.error('Error al cargar reservas:', error);
      setLoading(false);
    }
  };

  const fetchRooms = async () => {
    try {
      const response = await fetch('http://localhost:8000/habitaciones');
      const data = await response.json();
      // Filtrar habitaciones que no estén en mantenimiento
      const availableRooms = data.filter(room => room.estado !== 'mantenimiento');
      setRooms(availableRooms);
    } catch (error) {
      console.error('Error al cargar habitaciones:', error);
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
      // Convertir el número de habitación a número para la comparación
      const numeroHabitacion = parseInt(formData.numero_habitacion);
      
      // Verificar si la habitación existe
      const habitacion = rooms.find(room => room.numero === numeroHabitacion);
      
      if (!habitacion) {
        alert('Error: La habitación seleccionada no existe');
        return;
      }

      // Si estamos editando y es la misma habitación, permitir la edición
      // Si es una habitación diferente o es una nueva reserva, verificar disponibilidad
      if (!isEditing || (isEditing && habitacion.numero !== parseInt(formData.numero_habitacion))) {
        if (habitacion.estado === 'mantenimiento' || habitacion.estado === 'ocupada') {
          alert('Error: La habitación no está disponible');
          return;
        }
      }

      const url = isEditing 
        ? `http://localhost:8000/reservas/editar/${formData.id_reserva}`
        : 'http://localhost:8000/reservas/agregar';
      
      const response = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          id_habitacion: habitacion.id_habitacion,
          numero_habitacion: habitacion.numero,
          estado: formData.estado || 'pendiente'
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al procesar la reserva');
      }

      await fetchReservations();
      resetForm();
    } catch (error) {
      console.error('Error:', error);
      alert(error.message || 'Error al procesar la reserva');
    }
  };

  const handleEdit = (reservation) => {
    const formatDateForInput = (dateString) => {
      const date = new Date(dateString);
      return date.toISOString().split('T')[0];
    };

    setFormData({
      ...reservation,
      numero_habitacion: reservation.numero_habitacion.toString(), // Usar numero_habitacion en lugar de id_habitacion
      fecha_entrada: formatDateForInput(reservation.fecha_entrada),
      fecha_salida: formatDateForInput(reservation.fecha_salida)
    });
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de que desea eliminar esta reservación?')) {
      try {
        const response = await fetch(`http://localhost:8000/reservas/eliminar/${id}`, {
          method: 'DELETE'
        });

        if (!response.ok) throw new Error('Error en la petición');

        await fetchReservations();
      } catch (error) {
        console.error('Error:', error);
        alert('Error al eliminar la reserva');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      numero_habitacion: '', // Actualizar este campo
      nombre: '',
      telefono: '',
      dni: '',
      fecha_entrada: '',
      fecha_salida: '',
      estado: 'pendiente'
    });
    setIsEditing(false);
    setShowForm(false);
  };

  // Agregar esta función de utilidad
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  // Resultado: "01-04-2025"

  const filteredReservations = reservations.filter(reservation =>
    reservation.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <input 
            type="text" 
            placeholder="Buscar por nombre de huésped..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button><i className="fas fa-search"></i></button>
        </div>
      </div>
      
      {showForm && (
        <div className="reservation-form-container">
          <h3>{isEditing ? 'Editar Reservación' : 'Nueva Reservación'}</h3>
          <form onSubmit={handleSubmit} className="reservation-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="nombre">Nombre del Huésped</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="dni">DNI</label>
                <input
                  type="text"
                  id="dni"
                  name="dni"
                  value={formData.dni}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="telefono">Teléfono</label>
                <input
                  type="text"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="numero_habitacion">Número de Habitación</label>
                <select
                  id="numero_habitacion"
                  name="numero_habitacion"
                  value={formData.numero_habitacion}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione una habitación</option>
                  {rooms
                    .filter(room => 
                      room.estado === 'disponible' || 
                      (isEditing && room.numero.toString() === formData.numero_habitacion)
                    )
                    .sort((a, b) => a.numero - b.numero)
                    .map(room => (
                      <option key={room.id_habitacion} value={room.numero}>
                        Habitación {room.numero} - {room.tipo} ({room.capacidad} personas) 
                        {room.estado !== 'disponible' ? ' - ' + room.estado : ''}
                      </option>
                    ))
                  }
                </select>
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="fecha_entrada">Fecha de entrada</label>
                <input
                  type="date"
                  id="fecha_entrada"
                  name="fecha_entrada"
                  value={formData.fecha_entrada}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="fecha_salida">Fecha de salida</label>
                <input
                  type="date"
                  id="fecha_salida"
                  name="fecha_salida"
                  value={formData.fecha_salida}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="estado">Estado</label>
                <select
                  id="estado"
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                >
                  <option value="pendiente">Pendiente</option>
                  <option value="confirmada">Confirmada</option>
                  <option value="cancelada">Cancelada</option>
                </select>
              </div>
            </div>
            
            <div className="form-actions">
              <button type="button" onClick={resetForm} className="cancel-btn">Cancelar</button>
              <button type="submit" className="submit-btn">
                {isEditing ? 'Actualizar' : 'Crear'} Reserva
              </button>
            </div>
          </form>
        </div>
      )}
      
      <div className="reservation-table-container">
        <table className="reservation-table">
          <thead>
            <tr>
              <th>Huésped</th>
              <th>DNI</th>
              <th>Habitación</th>
              <th>Check-in</th>
              <th>Check-out</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredReservations.length === 0 ? (
              <tr>
                <td colSpan="7" className="no-data">
                  {searchTerm ? 'No se encontraron reservaciones' : 'No hay reservaciones disponibles'}
                </td>
              </tr>
            ) : (
              filteredReservations.map(reservation => (
                <tr key={reservation.id_reserva} className={`status-${reservation.estado}`}>
                  <td>
                    <div className="guest-info">
                      <span className="guest-name">{reservation.nombre}</span>
                      <span className="guest-phone">{reservation.telefono}</span>
                    </div>
                  </td>
                  <td>{reservation.dni}</td>
                  <td>Habitación {reservation.numero_habitacion}</td>
                  <td>{formatDate(reservation.fecha_entrada)}</td>
                  <td>{formatDate(reservation.fecha_salida)}</td>
                  <td>
                    <span className={`status-badge ${reservation.estado}`}>
                      {reservation.estado
                        ? reservation.estado.charAt(0).toUpperCase() + reservation.estado.slice(1)
                        : 'Pendiente'
                      }
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
                        onClick={() => handleDelete(reservation.id_reserva)}
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
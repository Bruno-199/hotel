import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import '../css/habitaciones.css';

const Habitaciones = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  // This would typically come from an API
  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      const roomsData = [
        {
          id: 1,
          name: 'Habitación Standard',
          description: 'Habitación confortable con todas las comodidades básicas para una estadía placentera.',
          price: 100,
          capacity: 2,
          beds: '1 Cama Queen',
          image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
          available: true,
          type: 'standard'
        },
        {
          id: 2,
          name: 'Habitación Deluxe',
          description: 'Espaciosa habitación con vistas a la ciudad y amenities premium.',
          price: 150,
          capacity: 2,
          beds: '1 Cama King',
          image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80",
          available: true,
          type: 'deluxe'
        },
        {
          id: 3,
          name: 'Suite Junior',
          description: 'Suite elegante con sala de estar separada y baño de lujo.',
          price: 200,
          capacity: 3,
          beds: '1 Cama King + 1 Sofá cama',
          image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
          available: true,
          type: 'suite'
        },
        {
          id: 4,
          name: 'Suite Familiar',
          description: 'Amplia suite ideal para familias con dos habitaciones conectadas.',
          price: 250,
          capacity: 4,
          beds: '1 Cama King + 2 Camas Twin',
          image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80",
          available: false,
          type: 'suite'
        }
      ];
      
      setRooms(roomsData);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredRooms = filter === 'all' 
    ? rooms 
    : rooms.filter(room => room.type === filter);

  const handleReservation = (roomId) => {
    // This would typically redirect to a reservation form or modal
    alert(`Iniciando reserva para la habitación ID: ${roomId}`);
  };

  return (
    <div className="habitaciones-page">
      <div className="habitaciones-header">
        <h1>Nuestras Habitaciones</h1>
        <p>Descubra el confort y la elegancia en cada una de nuestras habitaciones</p>
      </div>
      
      <div className="filter-container">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          Todas
        </button>
        <button 
          className={`filter-btn ${filter === 'standard' ? 'active' : ''}`}
          onClick={() => setFilter('standard')}
        >
          Standard
        </button>
        <button 
          className={`filter-btn ${filter === 'deluxe' ? 'active' : ''}`}
          onClick={() => setFilter('deluxe')}
        >
          Deluxe
        </button>
        <button 
          className={`filter-btn ${filter === 'suite' ? 'active' : ''}`}
          onClick={() => setFilter('suite')}
        >
          Suites
        </button>
      </div>
      
      {loading ? (
        <div className="loading">Cargando habitaciones...</div>
      ) : (
        <div className="rooms-container">
          {filteredRooms.map(room => (
            <div className="room-card" key={room.id}>
              <div className="room-image">
                <img src={room.image} alt={room.name} />
                {!room.available && <div className="not-available">No Disponible</div>}
              </div>
              <div className="room-details">
                <h3>{room.name}</h3>
                <p className="room-description">{room.description}</p>
                <div className="room-info">
                  <p><i className="fas fa-user-friends"></i> Capacidad: {room.capacity} personas</p>
                  <p><i className="fas fa-bed"></i> {room.beds}</p>
                  <p className="room-price">${room.price} <span>/ noche</span></p>
                </div>
                <button 
                  className="reserve-btn"
                  onClick={() => handleReservation(room.id)}
                  disabled={!room.available}
                >
                  {room.available ? 'Reservar Ahora' : 'No Disponible'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default Habitaciones;
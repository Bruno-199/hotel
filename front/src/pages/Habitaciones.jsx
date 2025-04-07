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
          name: 'Habitación Single',
          description: 'Habitación confortable con todas las comodidades básicas para una estadía placentera.',
          price: 36000,
          price1: 30000,
          capacity: 1,
          beds: '1 Cama simple',
          // Agregar parámetros de transformación a la URL de Cloudinary
          image: "https://res.cloudinary.com/dhpcc3pqo/image/upload/w_800,h_600,c_fill,q_auto/v1743886787/IMG_4123_yjld69.jpg",
          available: true,
          type: 'single'
        },
        {
          id: 2,
          name: 'Habitación Doble',
          description: 'Espaciosa habitación con vistas a la ciudad y amenities premium.',
          price: 54000,
          price1: 42000,
          capacity: 2,
          beds: '1 Cama King',
          image: "https://drive.google.com/thumbnail?id=1UxDMa66cj3VLWdt5BkfirdZRuQgFrWyo",
          available: true,
          type: 'doble'
        },
        {
          id: 3,
          name: 'Habitación Triple',
          description: 'Suite elegante con sala de estar separada y baño de lujo.',
          price: 68000,
          price1: 50000,
          capacity: 3,
          beds: '1 Cama King + 1 Sofá cama',
          image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
          available: true,
          type: 'triple'
        },
        {
          id: 4,
          name: 'Habitación Cuadruple',
          description: 'Amplia suite ideal para familias con dos habitaciones conectadas.',
          price: 84000,
          capacity: 4,
          beds: '1 Cama King + 2 Camas Twin',
          image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80",
          available: true,
          type: 'cuadruple'
        },
        {
          id: 5,
          name: 'Habitación Quintuple',
          description: 'Espaciosa habitación con vistas a la ciudad y amenities premium.',
          price: 89000,
          capacity: 2,
          beds: '1 Cama King',
          image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80",
          available: true,
          type: 'quintuple'
        },
        {
          id: 6,
          name: 'Habitación Suite',
          description: 'Espaciosa habitación con vistas a la ciudad y amenities premium.',
          price: 100000,
          capacity: 2,
          beds: '1 Cama King',
          image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80",
          available: true,
          type: 'suite'
        },
      ];
      
      setRooms(roomsData);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredRooms = filter === 'all' 
    ? rooms 
    : rooms.filter(room => room.type === filter);

  const handleReservation = (room) => {
    // Número de teléfono al que se enviará el mensaje (reemplaza con el número real)
    const phoneNumber = "543816396545"; 
  
    // Crear el mensaje predeterminado
    const message = `Hola, me interesa reservar la ${room.name}`;
  
    // Codificar el mensaje para la URL
    const encodedMessage = encodeURIComponent(message);
  
    // Crear el enlace de WhatsApp
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  
    // Abrir WhatsApp en una nueva pestaña
    window.open(whatsappURL, '_blank');
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
          className={`filter-btn ${filter === 'single' ? 'active' : ''}`}
          onClick={() => setFilter('single')}
        >
          Single
        </button>
        <button 
          className={`filter-btn ${filter === 'doble' ? 'active' : ''}`}
          onClick={() => setFilter('doble')}
        >
         Doble
        </button>
        <button 
          className={`filter-btn ${filter === 'triple' ? 'active' : ''}`}
          onClick={() => setFilter('triple')}
        >
           Triple
        </button>
        <button 
          className={`filter-btn ${filter === 'cuadruple' ? 'active' : ''}`}
          onClick={() => setFilter('cuadruple')}
        >
          Cuadruple
        </button>
        <button 
          className={`filter-btn ${filter === 'quintuple' ? 'active' : ''}`}
          onClick={() => setFilter('quintuple')}
        >
          Quintuple
        </button>
        <button 
          className={`filter-btn ${filter === 'suite' ? 'active' : ''}`}
          onClick={() => setFilter('suite')}
        >
          Suite
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
                  <p className="room-price">${room.price} <span>/ con desayuno</span></p>
                  <p className="room-price">${room.price1} <span>/ sin desayuno</span></p>
                </div>
                <button 
                  className="reserve-btn"
                  onClick={() => handleReservation(room)}
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
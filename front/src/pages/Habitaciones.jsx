import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import '../css/habitaciones.css';

const Habitaciones = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    fechaEntrada: '',
    fechaSalida: '',
    conDesayuno: true,
    comentarios: ''
  });

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
          // Multiple images for each room
          images: [
            "https://res.cloudinary.com/dhpcc3pqo/image/upload/w_800,h_600,c_fill,q_auto/v1743886787/IMG_4123_yjld69.jpg",
            "https://res.cloudinary.com/dl7rnltwv/image/upload/w_800,h_600,c_fill,q_auto/v1744686363/IMG_4127_goi49g.jpg",
            "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
            "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
            "https://images.unsplash.com/photo-1631049035182-249067d7618e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
          ],
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
          images: [
            "https://drive.google.com/thumbnail?id=1UxDMa66cj3VLWdt5BkfirdZRuQgFrWyo",
            "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80",
            "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
            "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80",
            "https://images.unsplash.com/photo-1566195992011-5f6b21e539aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80"
          ],
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
          images: [
            "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
            "https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80",
            "https://images.unsplash.com/photo-1587985064135-0366536eab42?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
            "https://images.unsplash.com/photo-1631049552057-403cdb8f0658?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
            "https://images.unsplash.com/photo-1631049035644-abb2f1be7c9e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
          ],
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
          images: [
            "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80",
            "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
            "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80",
            "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80",
            "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
          ],
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
          images: [
            "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80",
            "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
            "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80",
            "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
            "https://images.unsplash.com/photo-1631049035182-249067d7618e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
          ],
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
          images: [
            "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80",
            "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80",
            "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
            "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80",
            "https://images.unsplash.com/photo-1566195992011-5f6b21e539aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80"
          ],
          available: true,
          type: 'suite'
        },
      ];
      
      // Initialize current image index for each room
      const initialImageIndices = {};
      roomsData.forEach(room => {
        initialImageIndices[room.id] = 0;
      });
      setCurrentImageIndex(initialImageIndices);
      
      setRooms(roomsData);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredRooms = filter === 'all' 
    ? rooms 
    : rooms.filter(room => room.type === filter);

  const handleReservation = (room) => {
    setSelectedRoom(room);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRoom(null);
    // Reset form data
    setFormData({
      nombre: '',
      apellido: '',
      email: '',
      telefono: '',
      fechaEntrada: '',
      fechaSalida: '',
      conDesayuno: true,
      comentarios: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmitReservation = (e) => {
    e.preventDefault();
    
    // Get the selected price based on breakfast option
    const precioSeleccionado = formData.conDesayuno ? selectedRoom.price : (selectedRoom.price1 || selectedRoom.price);
    
    // Prepare the message with all the reservation details
    const phoneNumber = "543814018898";
    const message = `
Hola, me interesa reservar la ${selectedRoom.name}
Nombre: ${formData.nombre} ${formData.apellido}
Email: ${formData.email}
Teléfono: ${formData.telefono}
Fecha de entrada: ${formData.fechaEntrada}
Fecha de salida: ${formData.fechaSalida}
Opción: ${formData.conDesayuno ? 'Con desayuno' : 'Sin desayuno'}
Precio: $${precioSeleccionado}
Comentarios: ${formData.comentarios}
    `;
    
    // Encode the message for the URL
    const encodedMessage = encodeURIComponent(message);
    
    // Create the WhatsApp link
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappURL, '_blank');
    
    // Close the modal
    handleCloseModal();
  };

  // Image navigation functions
  const nextImage = (roomId) => {
    setCurrentImageIndex(prev => {
      const room = rooms.find(r => r.id === roomId);
      const currentIndex = prev[roomId];
      const nextIndex = (currentIndex + 1) % room.images.length;
      return { ...prev, [roomId]: nextIndex };
    });
  };

  const prevImage = (roomId) => {
    setCurrentImageIndex(prev => {
      const room = rooms.find(r => r.id === roomId);
      const currentIndex = prev[roomId];
      const prevIndex = (currentIndex - 1 + room.images.length) % room.images.length;
      return { ...prev, [roomId]: prevIndex };
    });
  };

  // Calculate minimum dates for the date inputs
  const today = new Date().toISOString().split('T')[0];
  const getMinCheckoutDate = () => {
    if (!formData.fechaEntrada) return today;
    
    const checkIn = new Date(formData.fechaEntrada);
    const nextDay = new Date(checkIn);
    nextDay.setDate(checkIn.getDate() + 1);
    return nextDay.toISOString().split('T')[0];
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
                <img src={room.images[currentImageIndex[room.id]]} alt={room.name} />
                {!room.available && <div className="not-available">No Disponible</div>}
                
                {/* Image navigation controls */}
                <div className="image-navigation">
                  <button className="nav-btn prev" onClick={(e) => {
                    e.stopPropagation();
                    prevImage(room.id);
                  }}>
                    <i className="fas fa-chevron-left"></i>
                  </button>
                  <div className="image-indicator">
                    {room.images.map((_, index) => (
                      <span 
                        key={index} 
                        className={`indicator-dot ${index === currentImageIndex[room.id] ? 'active' : ''}`}
                      ></span>
                    ))}
                  </div>
                  <button className="nav-btn next" onClick={(e) => {
                    e.stopPropagation();
                    nextImage(room.id);
                  }}>
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </div>
              </div>
              <div className="room-details">
                <h3>{room.name}</h3>
                <p className="room-description">{room.description}</p>
                <div className="room-info">
                  <p><i className="fas fa-user-friends"></i> Capacidad: {room.capacity} personas</p>
                  <p><i className="fas fa-bed"></i> {room.beds}</p>
                  <p className="room-price">${room.price} <span>/ con desayuno</span></p>
                  {room.price1 && <p className="room-price">${room.price1} <span>/ sin desayuno</span></p>}
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
      

      {/* Reservation Modal */}
      {showModal && selectedRoom && (
        <div className="reservation-modal-overlay">
          <div className="reservation-modal">
            <div className="modal-header">
              <h2>Reservar {selectedRoom.name}</h2>
              <button className="close-modal" onClick={handleCloseModal}>×</button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmitReservation}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="nombre">Nombre</label>
                    <input 
                      type="text" 
                      id="nombre" 
                      name="nombre" 
                      value={formData.nombre} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="apellido">Apellido</label>
                    <input 
                      type="text" 
                      id="apellido" 
                      name="apellido" 
                      value={formData.apellido} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="telefono">Teléfono</label>
                    <input 
                      type="tel" 
                      id="telefono" 
                      name="telefono" 
                      value={formData.telefono} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="fechaEntrada">Fecha de entrada</label>
                    <input 
                      type="date" 
                      id="fechaEntrada" 
                      name="fechaEntrada" 
                      value={formData.fechaEntrada} 
                      onChange={handleInputChange} 
                      min={today}
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="fechaSalida">Fecha de salida</label>
                    <input 
                      type="date" 
                      id="fechaSalida" 
                      name="fechaSalida" 
                      value={formData.fechaSalida} 
                      onChange={handleInputChange} 
                      min={getMinCheckoutDate()}
                      required 
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="conDesayuno">Opción de precio</label>
                  <select
                    id="conDesayuno"
                    name="conDesayuno"
                    value={formData.conDesayuno}
                    onChange={(e) => setFormData({
                      ...formData,
                      conDesayuno: e.target.value === 'true'
                    })}
                    className="form-select"
                  >
                    <option value="true">Con desayuno (${selectedRoom.price})</option>
                    {selectedRoom.price1 && (
                      <option value="false">Sin desayuno (${selectedRoom.price1})</option>
                    )}
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="comentarios">Comentarios adicionales</label>
                  <textarea 
                    id="comentarios" 
                    name="comentarios" 
                    value={formData.comentarios} 
                    onChange={handleInputChange} 
                    rows="3"
                  ></textarea>
                </div>
                
                <div className="reservation-summary">
                  <h3>Resumen de la reserva</h3>
                  <p><strong>Habitación:</strong> {selectedRoom.name}</p>
                  <p><strong>Precio seleccionado:</strong> ${formData.conDesayuno ? selectedRoom.price : (selectedRoom.price1 || selectedRoom.price)}</p>
                  <p><strong>Opción:</strong> {formData.conDesayuno ? 'Con desayuno' : 'Sin desayuno'}</p>
                  <p><strong>Capacidad:</strong> {selectedRoom.capacity} personas</p>
                </div>
                
                <div className="form-actions">
                  <button type="button" className="cancel-btn" onClick={handleCloseModal}>Cancelar</button>
                  <button type="submit" className="confirm-btn">Confirmar Reserva</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default Habitaciones;
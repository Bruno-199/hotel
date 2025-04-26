import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import '../css/habitaciones.css';

const Habitaciones = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    fechaEntrada: '',
    fechaSalida: '',
    mensaje: '',
    tipoTarifa: 'conDesayuno' // Nuevo estado para el tipo de tarifa
  });

  // This would typically come from an API
  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      const roomsData = [
        {
          id: 1,
          name: 'Habitación Single',
          description: 'Wi-Fi gratis, vistas, piscina en la azotea, aire acondicionado, baño en la habitacion, Tv pantalla plana.',
          price: 36000,
          price1: 30000,
          capacity: 1,
          beds: '1 Cama Twin',
          // Agregar parámetros de transformación a la URL de Cloudinary
          image: "https://res.cloudinary.com/dl7rnltwv/image/upload/w_800,h_600,c_fill,q_auto/v1744686349/IMG_4086_sbwlkv.jpg",
          available: true,
          type: 'single'
        },
        {
          id: 2,
          name: 'Habitación Doble',
          description: 'Wi-Fi gratis, vistas, piscina en la azotea, aire acondicionado, baño en la habitacion, Tv pantalla plana.',
          price: 54000,
          price1: 42000,
          capacity: 2,
          beds: '1 Cama King',
          image: "https://res.cloudinary.com/dl7rnltwv/image/upload/w_800,h_600,c_fill,q_auto/v1744686353/IMG_4093_hj4xdo.jpg",
          available: true,
          type: 'doble'
        },
        {
          id: 3,
          name: 'Habitación Triple',
          description: 'Wi-Fi gratis, vistas, piscina en la azotea, aire acondicionado, baño en la habitacion, Tv pantalla plana.',
          price: 68000,
          price1: 50000,
          capacity: 3,
          beds: '1 Cama King + 1 Cama Twin',
          image: "https://res.cloudinary.com/dl7rnltwv/image/upload/w_800,h_600,c_fill,q_auto/v1744686354/IMG_4103_dirfzo.jpg",
          available: true,
          type: 'triple'
        },
        {
          id: 4,
          name: 'Habitación Cuadruple',
          description: 'Wi-Fi gratis, vistas, piscina en la azotea, aire acondicionado, baño en la habitacion, Tv pantalla plana.',
          price: 84000,
          capacity: 4,
          beds: '1 Cama King + 2 Camas Twin',
          image: "https://res.cloudinary.com/dl7rnltwv/image/upload/w_800,h_600,c_fill,q_auto/v1744686355/IMG_4096_r7tedb.jpg",
          available: true,
          type: 'cuadruple'
        },
        {
          id: 5,
          name: 'Habitación Quintuple',
          description: 'Wi-Fi gratis, vistas, piscina en la azotea, aire acondicionado, baño en la habitacion, Tv pantalla plana.',
          price: 89000,
          capacity: 5,
          beds: '1 Cama King + 3 Camas Twin',
          image: "https://res.cloudinary.com/dl7rnltwv/image/upload/w_800,h_600,c_fill,q_auto/v1744686357/IMG_4112_jdnv27.jpg",
          available: true,
          type: 'quintuple'
        },
        {
          id: 6,
          name: 'Habitación Suite',
          description: 'Destacada por su tamaño para mayor comodidad, Wi-Fi gratis, vistas, piscina en la azotea, aire acondicionado, amplio baño en la habitacion, Tv pantalla plana.',
          price: 100000,
          capacity: 2,
          beds: '1 Cama King',
          image: "https://res.cloudinary.com/dl7rnltwv/image/upload/w_800,h_600,c_fill,q_auto/v1744686362/IMG_4125_g0dkni.jpg",
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
    setSelectedRoom(room);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRoom(null);
    setFormData({
      nombre: '',
      email: '',
      telefono: '',
      fechaEntrada: '',
      fechaSalida: '',
      mensaje: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Función para calcular los días de estadía
  const calcularDiasEstadia = (fechaEntrada, fechaSalida) => {
    if (!fechaEntrada || !fechaSalida) return 0;
    const inicio = new Date(fechaEntrada);
    const fin = new Date(fechaSalida);
    const diferencia = fin.getTime() - inicio.getTime();
    return Math.ceil(diferencia / (1000 * 3600 * 24));
  };

  // Función para calcular el precio total
  const calcularPrecioTotal = () => {
    if (!selectedRoom || !formData.fechaEntrada || !formData.fechaSalida) return 0;
    const dias = calcularDiasEstadia(formData.fechaEntrada, formData.fechaSalida);
    const precioBase = formData.tipoTarifa === 'conDesayuno' ? selectedRoom.price : selectedRoom.price1;
    return dias * precioBase;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const diasEstadia = calcularDiasEstadia(formData.fechaEntrada, formData.fechaSalida);
    const precioTotal = calcularPrecioTotal();
    
    // Crear el mensaje para WhatsApp
    const message = `¡Hola! Me gustaría hacer una reserva:
    - Habitación: ${selectedRoom.name}
    - Nombre: ${formData.nombre}
    - Email: ${formData.email}
    - Teléfono: ${formData.telefono}
    - Fecha de entrada: ${formData.fechaEntrada}
    - Fecha de salida: ${formData.fechaSalida}
    - Tipo de tarifa: ${formData.tipoTarifa === 'conDesayuno' ? 'Con desayuno' : 'Sin desayuno'}
    - Días de estadía: ${diasEstadia}
    - Precio total: $${precioTotal}
    - Mensaje adicional: ${formData.mensaje}`;

    // Número de teléfono al que se enviará el mensaje
    const phoneNumber = "543816396545";
    
    // Codificar el mensaje para la URL
    const encodedMessage = encodeURIComponent(message);
    
    // Crear el enlace de WhatsApp
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Abrir WhatsApp en una nueva pestaña
    window.open(whatsappURL, '_blank');
    
    // Cerrar el modal
    handleCloseModal();
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="habitaciones-page">
      <div className="habitaciones-header" data-aos="fade-down">
        <h1>Nuestras Habitaciones</h1>
        <p>Descubra el confort y la elegancia en cada una de nuestras habitaciones</p>
      </div>
      
      <div className="filter-container" data-aos="fade-up">
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
      
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={handleCloseModal}>&times;</button>
            <h2>Reservar {selectedRoom?.name}</h2>
            <form className="reservation-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="nombre">Nombre completo:</label>
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
                <label htmlFor="email">Email:</label>
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
                <label htmlFor="telefono">Teléfono:</label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="tipoTarifa">Tipo de Tarifa:</label>
                <select
                  id="tipoTarifa"
                  name="tipoTarifa"
                  value={formData.tipoTarifa}
                  onChange={handleInputChange}
                  required
                >
                  <option value="conDesayuno">Con desayuno (${selectedRoom?.price})</option>
                  <option value="sinDesayuno">Sin desayuno (${selectedRoom?.price1})</option>
                </select>
              </div>
              <div className="date-inputs">
                <div className="form-group">
                  <label htmlFor="fechaEntrada">Fecha de entrada:</label>
                  <input
                    type="date"
                    id="fechaEntrada"
                    name="fechaEntrada"
                    value={formData.fechaEntrada}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="fechaSalida">Fecha de salida:</label>
                  <input
                    type="date"
                    id="fechaSalida"
                    name="fechaSalida"
                    value={formData.fechaSalida}
                    onChange={handleInputChange}
                    min={formData.fechaEntrada || new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
              </div>
              
              {formData.fechaEntrada && formData.fechaSalida && (
                <div className="reservation-summary">
                  <h3>Resumen de la reserva</h3>
                  <div className="summary-details">
                    <p>Días de estadía: {calcularDiasEstadia(formData.fechaEntrada, formData.fechaSalida)}</p>
                    <p>Tipo de tarifa: {formData.tipoTarifa === 'conDesayuno' ? 'Con desayuno' : 'Sin desayuno'}</p>
                    <p className="total-price">Precio total: ${calcularPrecioTotal()}</p>
                  </div>
                </div>
              )}

              <div className="form-group">
                <label htmlFor="mensaje">Mensaje adicional (opcional):</label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleInputChange}
                  rows="3"
                />
              </div>
              <button type="submit" className="submit-btn">Enviar Reserva</button>
            </form>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default Habitaciones;
import React, { useState } from 'react';
import '../css/services.css';

const Services = () => {
  const [showPoolDetails, setShowPoolDetails] = useState(false);
  const [showRestaurantDetails, setShowRestaurantDetails] = useState(false);
  const [showParkingDetails, setShowParkingDetails] = useState(false);
  const [showBreakfastDetails, setShowBreakfastDetails] = useState(false);
  const [showWifiDetails, setShowWifiDetails] = useState(false);
  const [showRoomServiceDetails, setShowRoomServiceDetails] = useState(false); // Estado para Servicio de Habitación

  const services = [
    {
      icon: 'fas fa-wifi',
      title: 'Wi-Fi Gratuito',
      description: 'Conexión de alta velocidad en todas las áreas del hotel',
      details: (
        <>
          <p>Wi-Fi gratis de alta velocidad.</p>
          <p>Todas las habitaciones poseen Wi-Fi para poder navegar en todo momento.</p>
        </>
      )
    },
    {
      icon: 'fas fa-utensils',
      title: 'Restaurante',
      description: 'Disfrute de nuestra exquisita gastronomía internacional',
      details: (
        <>
          <p>
            En nuestro Hotel, cada comida es una celebración de los sabores. Nuestro restaurante a la carta ofrece una propuesta culinaria única, donde los ingredientes frescos y de calidad se combinan para brindarte una experiencia inolvidable. Desde platos tradicionales hasta propuestas innovadoras, cada receta está pensada para cautivar tu paladar.
          </p>
          <p>
            Con un ambiente acogedor y elegante, nuestro restaurante es el lugar perfecto para disfrutar de un almuerzo relajado o una cena especial. Ya sea que busques un espacio íntimo o uno más animado, el servicio personalizado y la calidad de nuestros platos harán de tu comida un momento único.
          </p>
        </>
      )
    },
    {
      icon: 'fas fa-swimming-pool',
      title: 'Piscina',
      description: 'Relájese en nuestra piscina con vistas panorámicas',
      details: (
        <>
          <p>
            Relájate en nuestra piscina al aire libre, ubicada en la azotea del hotel, con una vista panorámica de la ciudad que te va a dejar sin palabras. Ideal para disfrutar del sol, refrescarte después de un día de paseo o simplemente desconectar por un rato.
          </p>
          <ul>
            <li>Piscina al aire libre</li>
            <li>Solárium con reposeras y sombrillas</li>
            <li>Toallas disponibles para huéspedes</li>
            <li>Vista privilegiada del atardecer</li>
          </ul>
        </>
      )
    },
    {
      icon: 'fas fa-car',
      title: 'Estacionamiento',
      description: 'Estacionamiento seguro y cómodo para nuestros huéspedes',
      details: (
        <>
          <p>
            Para tu mayor comodidad, el hotel cuenta con estacionamiento disponible para todos nuestros huéspedes. El servicio está incluido en tu estadía, sin costo adicional.
          </p>
          <p>
            Ya sea que llegues en auto o alquiles uno durante tu visita, vas a poder dejarlo en un espacio seguro, dentro de nuestras instalaciones, con acceso directo al hotel.
          </p>
          <ul>
            <li>Estacionamiento cubierto y al aire libre</li>
            <li>Seguridad las 24 horas</li>
            <li>Acceso cómodo y directo al hotel</li>
          </ul>
        </>
      )
    },
    {
      icon: 'fas fa-coffee',
      title: 'Desayuno Buffet',
      description: 'Empieza tu día con un desayuno completo y variado',
      details: (
        <>
          <p>
            Creemos que el desayuno es mucho más que una comida: es el primer momento del día en el que podés relajarte, disfrutar y recargar energías. Por eso, todas las mañanas te esperamos con un desayuno buffet completo y variado, pensado para acompañarte sin apuros, con sabor y calidez.
          </p>
          <p>
            En nuestro salón desayunador, te recibimos con una amplia selección de productos frescos y de calidad. Desde panes artesanales recién horneados hasta frutas de estación, cada detalle está cuidado para que encuentres lo que más te gusta.
          </p>
        </>
      )
    },
    {
      icon: 'fas fa-concierge-bell',
      title: 'Servicio de Habitación',
      description: 'Atención personalizada en horarios seleccionados',
      details: (
        <>
          <p>
            Disfrutá de nuestro servicio a la habitación en horarios seleccionados. Podés solicitar desayuno, refrigerios o cenas ligeras desde el menú disponible en tu habitación, con solo llamar desde el teléfono interno.
          </p>
        </>
      )
    }
  ];

  return (
    <section className="services-section" id="servicios">
      <div className="services-header">
        <h2>Nuestros Servicios</h2>
        <p>Disfrute de todas las comodidades que Hotel Le Park tiene para ofrecerle</p>
      </div>
      
      <div className="services-container">
        {services.map((service, index) => (
          <div className="service-card" key={index}>
            <div className="service-icon">
              <i className={service.icon}></i>
            </div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            {service.title === 'Wi-Fi Gratuito' && (
              <>
                <button 
                  className="details-button" 
                  onClick={() => setShowWifiDetails(!showWifiDetails)}
                >
                  {showWifiDetails ? 'Cerrar Detalles' : 'Ver Más'}
                </button>
                {showWifiDetails && (
                  <div className="service-details">
                    {service.details}
                  </div>
                )}
              </>
            )}
            {service.title === 'Piscina' && (
              <>
                <button 
                  className="details-button" 
                  onClick={() => setShowPoolDetails(!showPoolDetails)}
                >
                  {showPoolDetails ? 'Cerrar Detalles' : 'Ver Más'}
                </button>
                {showPoolDetails && (
                  <div className="service-details">
                    {service.details}
                  </div>
                )}
              </>
            )}
            {service.title === 'Restaurante' && (
              <>
                <button 
                  className="details-button" 
                  onClick={() => setShowRestaurantDetails(!showRestaurantDetails)}
                >
                  {showRestaurantDetails ? 'Cerrar Detalles' : 'Ver Más'}
                </button>
                {showRestaurantDetails && (
                  <div className="service-details">
                    {service.details}
                  </div>
                )}
              </>
            )}
            {service.title === 'Estacionamiento' && (
              <>
                <button 
                  className="details-button" 
                  onClick={() => setShowParkingDetails(!showParkingDetails)}
                >
                  {showParkingDetails ? 'Cerrar Detalles' : 'Ver Más'}
                </button>
                {showParkingDetails && (
                  <div className="service-details">
                    {service.details}
                  </div>
                )}
              </>
            )}
            {service.title === 'Desayuno Buffet' && (
              <>
                <button 
                  className="details-button" 
                  onClick={() => setShowBreakfastDetails(!showBreakfastDetails)}
                >
                  {showBreakfastDetails ? 'Cerrar Detalles' : 'Ver Más'}
                </button>
                {showBreakfastDetails && (
                  <div className="service-details">
                    {service.details}
                  </div>
                )}
              </>
            )}
            {service.title === 'Servicio de Habitación' && (
              <>
                <button 
                  className="details-button" 
                  onClick={() => setShowRoomServiceDetails(!showRoomServiceDetails)}
                >
                  {showRoomServiceDetails ? 'Cerrar Detalles' : 'Ver Más'}
                </button>
                {showRoomServiceDetails && (
                  <div className="service-details">
                    {service.details}
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
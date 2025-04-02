import React from 'react';
import '../css/services.css';

const Services = () => {
  const services = [
    {
      icon: 'fas fa-wifi',
      title: 'Wi-Fi Gratuito',
      description: 'Conexión de alta velocidad en todas las áreas del hotel'
    },
    {
      icon: 'fas fa-utensils',
      title: 'Restaurante',
      description: 'Disfrute de nuestra exquisita gastronomía internacional'
    },
    {
      icon: 'fas fa-swimming-pool',
      title: 'Piscina',
      description: 'Relájese en nuestra piscina con vistas panorámicas'
    },
    {
      icon: 'fas fa-spa',
      title: 'Spa & Wellness',
      description: 'Tratamientos exclusivos para su bienestar y relajación'
    },
    {
      icon: 'fas fa-dumbbell',
      title: 'Gimnasio',
      description: 'Equipamiento moderno para mantener su rutina de ejercicios'
    },
    {
      icon: 'fas fa-concierge-bell',
      title: 'Servicio de Habitación',
      description: 'Atención personalizada las 24 horas del día'
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
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
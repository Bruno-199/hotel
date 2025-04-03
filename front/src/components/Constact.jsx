import React, { useState } from 'react';
import '../css/contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    alert('Gracias por contactarnos. Nos comunicaremos a la brevedad.');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
  };

  return (
    <section className="contact-section" id="contacto">
      <div className="contact-container">
        <div className="contact-info">
          <h2>Contáctenos</h2>
          <p>Estamos a su disposición para responder cualquier consulta</p>
          
          <div className="info-item">
            <i className="fas fa-map-marker-alt"></i>
            <p>Av. Principal 123, Ciudad</p>
          </div>
          
          <div className="info-item">
            <i className="fas fa-phone"></i>
            <p>+54 11 1234-5678</p>
          </div>
          
          <div className="info-item">
            <i className="fas fa-envelope"></i>
            <p>info@hotellepark.com</p>
          </div>
          
          <div className="social-media">
            <a href="https://www.facebook.com/hotellepark?locale=es_LA" className="social-icon"><i className="fab fa-facebook-f"></i></a>
            <a href="https://www.instagram.com/hotel.lepark/" className="social-icon"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
        
        <div className="contact-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nombre</label>
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
            
            <div className="form-group">
              <label htmlFor="phone">Teléfono</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Mensaje</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            
            <button type="submit" className="submit-btn">Enviar Mensaje</button>
          </form>
        </div>
      </div>
      
      <div className="map-container">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.0168878895476!2d-58.38375908417444!3d-34.60373446500075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDM2JzEzLjQiUyA1OMKwMjInNTguMiJX!5e0!3m2!1ses-419!2sar!4v1623252354862!5m2!1ses-419!2sar" 
          width="100%" 
          height="450" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy"
          title="Hotel Location"
        ></iframe>
      </div>
    </section>
  );
};

export default Contact;
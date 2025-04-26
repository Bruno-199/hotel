import React from 'react';
import { Link } from 'react-router-dom';
import '../css/footer.css';

const Footer = () => {
  // Using an online logo URL instead of local import
  const logoUrl = "https://lh3.googleusercontent.com/proxy/xqttsQDGnGeNZhbwkodBvbXcwKuHxdecxTsa8AyUG3pFSH-Th-hemilbqqcc3Hrqm-xc5vO9K9n9xevRwXuFOBp2NQ";

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <img src={logoUrl} alt="Hotel Le Park Logo" />
          <p>Elegancia y confort en cada detalle</p>
        </div>
        
        <div className="footer-links">
          <h4>Enlaces Rápidos</h4>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/habitaciones">Habitaciones</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </div>
        
        <div className="footer-contact">
          <h4>Contacto</h4>
          <p><i className="fas fa-map-marker-alt"></i>  Junín 1134, San Miguel de Tucumán, Tucumán.</p>
          <p><i className="fas fa-phone"></i> +543814218818</p>
          <p><i className="fas fa-envelope"></i> info@hotellepark.com</p>
        </div>
        
        
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Hotel Le Park. Todos los derechos reservados.</p>
        <div className="footer-social">
          <a href="https://www.facebook.com/hotellepark?locale=es_LA" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
          <a href="https://www.instagram.com/hotel.lepark/" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/footer.css';

const Footer = () => {
  // Using an online logo URL instead of local import
  const logoUrl = "https://img.freepik.com/free-vector/gradient-hotel-logo-template_23-2149928443.jpg";

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <img src={logoUrl} alt="Hotel Le Park Logo" />
          <h3>Hotel Le Park</h3>
          <p>Elegancia y confort en cada detalle</p>
        </div>
        
        <div className="footer-links">
          <h4>Enlaces Rápidos</h4>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/habitaciones">Habitaciones</Link></li>
            <li><Link to="/#servicios">Servicios</Link></li>
            <li><Link to="/#contacto">Contacto</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </div>
        
        <div className="footer-contact">
          <h4>Contacto</h4>
          <p><i className="fas fa-map-marker-alt"></i> Av. Principal 123, Ciudad</p>
          <p><i className="fas fa-phone"></i> +54 11 1234-5678</p>
          <p><i className="fas fa-envelope"></i> info@hotellepark.com</p>
        </div>
        
        <div className="footer-newsletter">
          <h4>Suscríbase a nuestro Newsletter</h4>
          <p>Reciba nuestras ofertas y novedades</p>
          <form>
            <input type="email" placeholder="Su email" required />
            <button type="submit">Suscribirse</button>
          </form>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Hotel Le Park. Todos los derechos reservados.</p>
        <div className="footer-social">
          <a href="#"><i className="fab fa-facebook-f"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
          <a href="#"><i className="fab fa-twitter"></i></a>
          <a href="#"><i className="fab fa-tripadvisor"></i></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
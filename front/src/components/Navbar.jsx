import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/navbar.css';

// Using an online logo instead of a local import
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Logo URL from a free logo site
  const logoUrl = "https://lh3.googleusercontent.com/proxy/xqttsQDGnGeNZhbwkodBvbXcwKuHxdecxTsa8AyUG3pFSH-Th-hemilbqqcc3Hrqm-xc5vO9K9n9xevRwXuFOBp2NQ";

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={logoUrl} alt="Hotel Le Park Logo" className="logo-img" />
        </Link>

        <div className="menu-icon" onClick={toggleMenu}>
          <i className={isMenuOpen ? 'fas fa-times' : 'fas fa-bars'} />
        </div>

        <ul className={isMenuOpen ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <Link to="/" className="nav-links" onClick={() => setIsMenuOpen(false)}>
              Inicio
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/habitaciones" className="nav-links" onClick={() => setIsMenuOpen(false)}>
              Habitaciones
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-links login-btn" onClick={() => setIsMenuOpen(false)}>
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
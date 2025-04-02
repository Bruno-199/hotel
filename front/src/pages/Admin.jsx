import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReservationTable from '../components/ReservationTable';
import RoomManagement from '../components/RoomManagement';
import '../css/admin.css';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('reservations');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus !== 'true') {
      navigate('/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!isAuthenticated) {
    return <div className="loading">Verificando autenticación...</div>;
  }

  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <div className="admin-profile">
          <div className="profile-avatar">
            <i className="fas fa-user-circle"></i>
          </div>
          <div className="profile-info">
            <h3>Administrador</h3>
            <p>Panel de Control</p>
          </div>
        </div>
        
        <ul className="admin-menu">
          <li 
            className={activeTab === 'reservations' ? 'active' : ''}
            onClick={() => setActiveTab('reservations')}
          >
            <i className="fas fa-calendar-check"></i>
            <span>Reservaciones</span>
          </li>
          <li 
            className={activeTab === 'rooms' ? 'active' : ''}
            onClick={() => setActiveTab('rooms')}
          >
            <i className="fas fa-bed"></i>
            <span>Gestión de Habitaciones</span>
          </li>
          <li onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i>
            <span>Cerrar Sesión</span>
          </li>
        </ul>
      </div>
      
      <div className="admin-content">
        <div className="admin-header">
          <h1>
            {activeTab === 'reservations' ? 'Gestión de Reservaciones' : 'Gestión de Habitaciones'}
          </h1>
          <div className="admin-date">
            <i className="far fa-calendar-alt"></i>
            <span>{new Date().toLocaleDateString()}</span>
          </div>
        </div>
        
        <div className="admin-main">
          {activeTab === 'reservations' ? (
            <ReservationTable />
          ) : (
            <RoomManagement />
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
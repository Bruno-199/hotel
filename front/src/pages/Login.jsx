import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/login.css';

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    // Simple validation
    if (!credentials.username || !credentials.password) {
      setError('Por favor complete todos los campos');
      return;
    }
    
    // Mock authentication - in a real app, this would be an API call
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      // Store authentication state (in a real app, you'd use JWT or similar)
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify({ username: credentials.username, role: 'admin' }));
      
      // Redirect to admin dashboard
      navigate('/admin');
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Acceso Administrativo</h2>
          <p>Ingrese sus credenciales para acceder al panel de administración</p>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Usuario</label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              placeholder="Ingrese su usuario"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Ingrese su contraseña"
            />
          </div>
          
          <button type="submit" className="login-btn">Iniciar Sesión</button>
        </form>
        
        <div className="login-footer">
          <p>¿Olvidó su contraseña? Contacte al administrador del sistema</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
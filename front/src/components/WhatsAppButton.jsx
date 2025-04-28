import React from 'react';

const WhatsAppButton = () => {
  const whatsappNumber = '+543814218818';
  const message = 'Hola, me gustaría obtener más información sobre el hotel.';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  const buttonStyle = {
    position: 'fixed',
    right: '20px',
    bottom: '20px',
    borderRadius: '50%',
    padding: '15px',
    boxShadow: '2px 2px 6px rgba(0,0,0,0.4)',
    zIndex: 1000,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    width: '50px',
    height: '50px',
    backgroundColor: '#25D366'
  };

  return (
    <a 
      href={whatsappUrl} 
      target="_blank" 
      rel="noopener noreferrer"
      style={buttonStyle}
    >
      <i className="fab fa-whatsapp" style={{ fontSize: '30px', color: 'white' }}></i>
    </a>
  );
};

export default WhatsAppButton;
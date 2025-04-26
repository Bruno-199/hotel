import React from 'react';

const SocialButtons = () => {
  const whatsappNumber = '+543814218818';
  const message = 'Hola, me gustaría obtener más información sobre el hotel.';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  const facebookUrl = 'https://www.facebook.com/hotellepark?locale=es_LA';
  const instagramUrl = 'https://www.instagram.com/hotel.lepark/';

  const buttonBaseStyle = {
    position: 'fixed',
    right: '20px',
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
    height: '50px'
  };

  const whatsappStyle = {
    ...buttonBaseStyle,
    bottom: '20px',
    backgroundColor: '#25D366'
  };

  const facebookStyle = {
    ...buttonBaseStyle,
    bottom: '90px',
    backgroundColor: '#3b5998'
  };

  const instagramStyle = {
    ...buttonBaseStyle,
    bottom: '160px',
    backgroundColor: '#E1306C'
  };

  return (
    <>
      <a 
        href={whatsappUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        style={whatsappStyle}
      >
        <i className="fab fa-whatsapp" style={{ fontSize: '30px', color: 'white' }}></i>
      </a>

      <a 
        href={facebookUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        style={facebookStyle}
      >
        <i className="fab fa-facebook-f" style={{ fontSize: '30px', color: 'white' }}></i>
      </a>

      <a 
        href={instagramUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        style={instagramStyle}
      >
        <i className="fab fa-instagram" style={{ fontSize: '30px', color: 'white' }}></i>
      </a>
    </>
  );
};

export default SocialButtons;
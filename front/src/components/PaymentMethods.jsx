import React from 'react';
import '../css/paymentMethods.css';

const PaymentMethods = () => {
  // Using online image URLs for payment logos
  const paymentMethods = [
    { 
      name: 'Visa', 
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/1200px-Visa_Inc._logo.svg.png" 
    },
    { 
      name: 'MasterCard', 
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" 
    },
    { 
      name: 'American Express', 
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/1200px-American_Express_logo_%282018%29.svg.png" 
    },
    { 
      name: 'PayPal', 
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1200px-PayPal.svg.png" 
    },
    { 
      name: 'MercadoPago', 
      logo: "https://logospng.org/download/mercado-pago/logo-mercado-pago-icone-1024.png" 
    }
  ];

  return (
    <section className="payment-methods-section">
      <div className="payment-methods-header">
        <h2>Métodos de Pago</h2>
        <p>Aceptamos diversas formas de pago para su comodidad</p>
      </div>
      
      <div className="payment-methods-container">
        {paymentMethods.map((method, index) => (
          <div className="payment-method-item" key={index}>
            <img src={method.logo} alt={method.name} />
            <p>{method.name}</p>
          </div>
        ))}
      </div>
      
      <div className="payment-info">
        <p>También aceptamos transferencias bancarias y pagos en efectivo al momento del check-in.</p>
        <p>Para reservas grupales o corporativas, contáctenos para opciones de pago especiales.</p>
      </div>
    </section>
  );
};

export default PaymentMethods;
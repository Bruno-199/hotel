import React from 'react';
import Carousel from '../components/Carousel';
import Services from '../components/Services';
import PaymentMethods from '../components/PaymentMethods';
import Contact from '../components/Constact';
import Footer from '../components/Footer';
import '../css/home.css';

const Home = () => {
  return (
    <div className="home-container">
      <Carousel />
      <section className="welcome-section">
        <div className="welcome-content">
          <h1>Bienvenidos a Hotel Le Park</h1>
          <p>
            El Hotel Le Park está ubicado en un lugar ideal para explorar la ciudad, a pocos kilómetros de los principales puntos turísticos. 
            Ofrece habitaciones cómodas con Wi-Fi gratuito, TV y escritorio, además de categorías superiores con minibar y caja fuerte. 
            Entre sus servicios destacan un restaurante, un salón acogedor, piscina al aire libre, espacios para eventos, desayuno buffet y estacionamiento.
            <br />  
            <br />
            <hr />
                  
            Horario Check In: 15:00 a 00:00 hs. 
            <br />
            Horario Check out: Hasta las 10:00 hs. 
          </p>
        </div>
      </section>
      <Services />
      <PaymentMethods />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;
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
            Disfrute de una experiencia única en nuestro lujoso hotel ubicado en el corazón de la ciudad.
            Ofrecemos comodidad, elegancia y un servicio excepcional para hacer de su estadía un momento inolvidable.
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
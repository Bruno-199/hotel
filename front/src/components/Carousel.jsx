import React, { useState, useEffect } from 'react';
import '../css/carousel.css';

// Using online image URLs instead of local imports to avoid path issues
const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
      title: "Elegancia y Confort",
      description: "Disfrute de nuestras lujosas instalaciones"
    },
    {
      image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
      title: "Habitaciones de Ensueño",
      description: "Descanse en nuestras cómodas y elegantes habitaciones"
    },
    {
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
      title: "Experiencia Inolvidable",
      description: "Viva momentos únicos en Hotel Le Park"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    
    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className="carousel">
      {slides.map((slide, index) => (
        <div 
          key={index} 
          className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className="carousel-content">
            <h2>{slide.title}</h2>
            <p>{slide.description}</p>
            <button className="btn-reserve">Reservar Ahora</button>
          </div>
        </div>
      ))}
      
      <button className="carousel-btn prev" onClick={prevSlide}>
        <i className="fas fa-chevron-left"></i>
      </button>
      <button className="carousel-btn next" onClick={nextSlide}>
        <i className="fas fa-chevron-right"></i>
      </button>
      
      <div className="carousel-dots">
        {slides.map((_, index) => (
          <span 
            key={index} 
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
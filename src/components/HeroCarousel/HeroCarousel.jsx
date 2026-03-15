import React, { useState, useEffect, useRef, useCallback } from 'react';
import './HeroCarousel.css';

const DATA = [
  { id: 1, title: "Modern Style", img: "/banners/sparky_banner.jfif" },
  { id: 2, title: "Pure Elegance", img: "/banners/don_patch_banner.jfif" },
  { id: 3, title: "Urban Living", img: "/banners/profy_banner.jfif" },
  { id: 4, title: "Classic Feel", img: "/banners/sparky2_banner.jfif" },
  { id: 5, title: "New Arrivals", img: "/banners/tensor_banner.jfif" },
  { id: 6, title: "Summer Sale", img: "/banners/man_kings_banner.jfif" },
];

// We add a clone of the first item to the end for the seamless effect
const SLIDES = [...DATA, DATA[0]];


const HeroCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [transitionEnabled, setTransitionEnabled] = useState(true);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);
    const intervalRef = useRef(null); // Add this at the top with your other refs

  const moveNext = useCallback(() => {
    setTransitionEnabled(true);
    setCurrentIndex((prev) => prev + 1);
  }, []);

  const movePrev = () => {
    if (currentIndex === 0) {
      // If at start, jump to clone position instantly then slide back
      setTransitionEnabled(false);
      setCurrentIndex(SLIDES.length - 1);
      setTimeout(() => {
        setTransitionEnabled(true);
        setCurrentIndex(SLIDES.length - 2);
      }, 50);
    } else {
      setTransitionEnabled(true);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Seamless Loop Logic: When we hit the clone (last item), snap back to index 0
  useEffect(() => {
    if (currentIndex === SLIDES.length - 1) {
      const timer = setTimeout(() => {
        setTransitionEnabled(false);
        setCurrentIndex(0);
      }, 600); // Wait for transition animation to finish
      return () => clearTimeout(timer);
    }
  }, [currentIndex]);

  // 10s Auto-swipe
  useEffect(() => {
    const interval = setInterval(moveNext, 10000);
    return () => clearInterval(interval);
  }, [moveNext]);

  // Touch Swipe Handlers
  const handleTouchStart = (e) => (touchStartX.current = e.touches[0].clientX);
  const handleTouchMove = (e) => (touchEndX.current = e.touches[0].clientX);
  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) moveNext(); // Swiped Left
    if (distance < -50) movePrev(); // Swiped Right
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  return (
    <div className="hero-carousel">
      <div 
        className="carousel-track"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: transitionEnabled ? 'transform 0.6s ease-in-out' : 'none'
        }}
      >
        {SLIDES.map((slide, index) => (
          <div key={`${slide.id}-${index}`} className="carousel-slide">
            <img src={slide.img} alt={slide.title} />
            <div className="slide-overlay">
              <h2>{slide.title}</h2>
              <div className="cta-container">
                <button className="cta-btn btn-primary">Shop Now</button>
                <button className="cta-btn btn-secondary">Explore</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="nav-arrow arrow-left" onClick={movePrev}>&#10094;</button>
      <button className="nav-arrow arrow-right" onClick={moveNext}>&#10095;</button>
    </div>
  );
};

export default HeroCarousel;

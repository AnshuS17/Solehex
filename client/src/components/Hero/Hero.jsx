import React, { useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import BottleSVG from '../BottleSVG';
import './Hero.css';

const Hero = ({ product }) => {
  const { addToCart } = useApp();
  const visualRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      if (visualRef.current && window.innerWidth > 900) {
        visualRef.current.style.transform = `translateY(calc(-50% + ${window.scrollY * 0.18}px))`;
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="hero">
      <div className="hero-bg" />
      <div className="hero-grain" />
      <div className="hero-lines" />

      <div className="hero-content">
        <div className="eyebrow">Maison Solehex — 2024</div>
        <h1 className="hero-title">
          SOLEHEX<br /><span>{product?.name?.split(' ')[1] || 'SIGNATURE'}</span>
        </h1>
        <p className="hero-subtitle">
          {product?.tagline || 'Where darkness becomes desire'}
        </p>
        <div className="hero-cta">
          <button className="btn-primary" onClick={() => product && addToCart(product._id)}>
            <span>Discover the Scent</span>
          </button>
          <button className="btn-secondary" onClick={() => scrollTo('story')}>
            Our Story
          </button>
        </div>
      </div>

      <div className="hero-visual" ref={visualRef}>
        <BottleSVG size="hero" />
      </div>

      <div className="hero-scroll">
        <div className="scroll-line" />
        Scroll to discover
      </div>
    </section>
  );
};

export default Hero;

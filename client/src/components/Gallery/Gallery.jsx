import React, { useState } from 'react';
import './Gallery.css';

const EDITIONS = [
  { label: 'No. I — Nuit',   bg: 'linear-gradient(160deg,#1a1612 0%,#2a1a10 40%,#3d1a0a 100%)', accent: '#C9A84C' },
  { label: 'No. II — Rouge',  bg: 'linear-gradient(200deg,#100d08 0%,#6b0f1a 60%,#1a0a0c 100%)', accent: '#8C1826' },
  { label: 'No. III — Or',    bg: 'linear-gradient(140deg,#0d0b08 0%,#1e1810 50%,#2a2010 100%)', accent: '#E8C97A' },
  { label: 'No. IV — Sombre', bg: 'linear-gradient(180deg,#120e0a 0%,#1a1512 50%,#8c1826 100%)', accent: '#7A6330' },
];

const Gallery = () => {
  const [active, setActive] = useState(null);

  return (
    <section className="gallery" id="gallery">
      <div className="gallery-header reveal">
        <h2 className="gallery-title">The Collection</h2>
        <span className="gallery-count">04 editions — 2024</span>
      </div>

      <div className="gallery-strip">
        {EDITIONS.map((ed, i) => (
          <div
            key={i}
            className={`gallery-item gi-${i + 1} ${active === i ? 'active' : ''}`}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
          >
            <div className="gallery-box" style={{ background: ed.bg }}>
              {/* Abstract SVG art per edition */}
              <svg viewBox="0 0 300 440" xmlns="http://www.w3.org/2000/svg"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                {i === 0 && <>
                  <path d="M150 100 L110 160 Q100 185 99 215 L93 360 Q92 380 116 386 L184 386 Q208 380 207 360 L201 215 Q200 185 190 160 L150 100 Z"
                    fill="rgba(201,168,76,0.07)" stroke="rgba(201,168,76,0.2)" strokeWidth="0.5" />
                  <rect x="130" y="82" width="40" height="22" rx="2" fill="rgba(201,168,76,0.12)" />
                </>}
                {i === 1 && <>
                  <path d="M150 100 Q200 150 190 230 Q180 300 120 320 Q80 330 100 390"
                    fill="none" stroke={`rgba(201,168,76,0.15)`} strokeWidth="40" />
                  <path d="M150 100 Q200 150 190 230 Q180 300 120 320 Q80 330 100 390"
                    fill="none" stroke="rgba(201,168,76,0.3)" strokeWidth="1" />
                </>}
                {i === 2 && <>
                  <polygon points="150,60 240,200 150,340 60,200" fill="none" stroke="rgba(201,168,76,0.12)" strokeWidth="0.5" />
                  <polygon points="150,100 210,200 150,300 90,200" fill="none" stroke="rgba(201,168,76,0.1)" strokeWidth="0.5" />
                  <polygon points="150,140 188,200 150,260 112,200" fill="rgba(201,168,76,0.04)" />
                </>}
                {i === 3 && <>
                  <ellipse cx="150" cy="220" rx="70" ry="100" fill="none" stroke="rgba(201,168,76,0.08)" strokeWidth="0.5" transform="rotate(-20,150,220)" />
                  <ellipse cx="150" cy="220" rx="70" ry="100" fill="none" stroke="rgba(201,168,76,0.06)" strokeWidth="0.5" transform="rotate(20,150,220)" />
                  <ellipse cx="150" cy="220" rx="50" ry="80" fill="none" stroke="rgba(201,168,76,0.1)" strokeWidth="0.5" />
                  <circle cx="150" cy="220" r="12" fill="rgba(201,168,76,0.15)" />
                </>}
                <text x="150" y="424" textAnchor="middle"
                  fontFamily="'Cormorant Garamond', serif" fontStyle="italic"
                  fontSize="11" fill={`rgba(201,168,76,0.45)`} letterSpacing="2">
                  {ed.label}
                </text>
              </svg>
            </div>
            <div className="gallery-overlay">
              <span>{ed.label}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;

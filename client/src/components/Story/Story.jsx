import React from 'react';
import './Story.css';

const Story = ({ product }) => (
  <section className="story" id="story">
    <div className="story-left reveal">
      <div className="eyebrow">Maison Solehex</div>
      <h2 className="story-heading">
        Crafted from<br /><em>the silence</em><br />between stars
      </h2>
      <div className="story-body">
        <p>{product?.story?.split('.').slice(0, 2).join('.') + '.' || 'Born in the atelier of an obsession, SOLEHEX Signature is not a perfume — it is a philosophy distilled into liquid form.'}</p>
        <p>We spent three years studying the olfactory memory of evening light on ancient stone, of rain on volcanic earth, of time itself made breathable.</p>
        <p>The result is a fragrance that does not ask to be noticed. It simply exists — and those who encounter it never forget.</p>
      </div>
    </div>
    <div className="story-visual reveal reveal-d2">
      <div className="story-frame" />
      <div className="story-img-box">
        <svg viewBox="0 0 280 400" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <radialGradient id="sg1" cx="50%" cy="40%" r="70%">
              <stop offset="0%" stopColor="#6b0f1a" stopOpacity="0.6" />
              <stop offset="60%" stopColor="#1a0e06" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#080604" stopOpacity="1" />
            </radialGradient>
          </defs>
          <rect width="280" height="400" fill="url(#sg1)" />
          {[{cx:80,cy:120,r:1.5,o:.5},{cx:140,cy:80,r:2,o:.4},{cx:200,cy:140,r:1,o:.6},
            {cx:60,cy:220,r:1.5,o:.3},{cx:220,cy:200,r:2.5,o:.35},{cx:180,cy:320,r:1.5,o:.3}]
            .map((p,i) => <circle key={i} cx={p.cx} cy={p.cy} r={p.r} fill={`rgba(201,168,76,${p.o})`} />)}
          <ellipse cx="140" cy="200" rx="60" ry="80" fill="rgba(107,15,26,0.25)" transform="rotate(-15,140,200)" />
          <ellipse cx="140" cy="200" rx="45" ry="65" fill="rgba(140,24,38,0.15)" transform="rotate(20,140,200)" />
          <ellipse cx="140" cy="200" rx="30" ry="50" fill="rgba(201,168,76,0.08)" />
          <circle cx="140" cy="200" r="12" fill="rgba(201,168,76,0.15)" />
          <text x="140" y="376" textAnchor="middle" fontFamily="'Cormorant Garamond', serif"
            fontSize="11" fontStyle="italic" fill="rgba(201,168,76,0.4)" letterSpacing="2">
            l'essence du mystère
          </text>
        </svg>
      </div>
    </div>
  </section>
);

export default Story;

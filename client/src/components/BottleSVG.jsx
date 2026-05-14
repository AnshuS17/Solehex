import React from 'react';

const BottleSVG = ({ size = 'default' }) => {
  const w = size === 'hero' ? 340 : 280;
  const h = size === 'hero' ? 560 : 460;
  const style = size === 'hero'
    ? { width: '320px', height: 'auto', filter: 'drop-shadow(0 40px 80px rgba(0,0,0,0.8)) drop-shadow(0 0 40px rgba(201,168,76,0.12))', animation: 'float 6s ease-in-out infinite' }
    : { width: '240px', height: 'auto', filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.7)) drop-shadow(0 0 30px rgba(201,168,76,0.1))', animation: 'float 6s ease-in-out infinite' };

  return (
    <svg viewBox={`0 0 ${w} ${h}`} xmlns="http://www.w3.org/2000/svg" style={style}>
      <defs>
        <linearGradient id="bG" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2a1e10" /><stop offset="30%" stopColor="#1a1208" />
          <stop offset="60%" stopColor="#6b0f1a" stopOpacity="0.6" /><stop offset="100%" stopColor="#0d0a06" />
        </linearGradient>
        <linearGradient id="gG" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7A6330" /><stop offset="35%" stopColor="#C9A84C" />
          <stop offset="65%" stopColor="#E8C97A" /><stop offset="100%" stopColor="#9A7A38" />
        </linearGradient>
        <radialGradient id="cG" cx="45%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#E8C97A" /><stop offset="100%" stopColor="#6A5428" />
        </radialGradient>
        <linearGradient id="lG" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8C1826" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#3d0a10" stopOpacity="0.85" />
        </linearGradient>
      </defs>
      {/* Cap shadow */}
      <ellipse cx={w/2} cy={h*0.29} rx={w*0.17} ry={h*0.015} fill="rgba(0,0,0,0.45)" />
      {/* Cap top accent */}
      <rect x={w*0.39} y={h*0.155} width={w*0.23} height={h*0.018} rx="2" fill="url(#gG)" />
      {/* Cap body */}
      <rect x={w*0.34} y={h*0.163} width={w*0.31} height={h*0.133} rx="4" fill="url(#cG)" />
      <rect x={w*0.35} y={h*0.167} width={w*0.09} height={h*0.125} rx="2" fill="rgba(255,255,255,0.07)" />
      <line x1={w*0.34} y1={h*0.19} x2={w*0.65} y2={h*0.19} stroke="rgba(100,76,25,0.5)" strokeWidth="0.5" />
      <line x1={w*0.34} y1={h*0.266} x2={w*0.65} y2={h*0.266} stroke="rgba(100,76,25,0.5)" strokeWidth="0.5" />
      {/* Neck */}
      <rect x={w*0.41} y={h*0.286} width={w*0.18} height={h*0.055} rx="2" fill="#1a1208" />
      <rect x={w*0.4} y={h*0.277} width={w*0.2} height={h*0.012} rx="1" fill="url(#gG)" />
      <rect x={w*0.4} y={h*0.332} width={w*0.2} height={h*0.009} rx="1" fill="url(#gG)" />
      {/* Bottle body */}
      <path
        d={`M${w*0.32} ${h*0.345} Q${w*0.23} ${h*0.385} ${w*0.21} ${h*0.455} L${w*0.18} ${h*0.825} Q${w*0.17} ${h*0.882} ${w*0.3} ${h*0.9} L${w*0.7} ${h*0.9} Q${w*0.83} ${h*0.882} ${w*0.82} ${h*0.825} L${w*0.79} ${h*0.455} Q${w*0.77} ${h*0.385} ${w*0.68} ${h*0.345} Z`}
        fill="url(#bG)" stroke="rgba(201,168,76,0.25)" strokeWidth="1"
      />
      {/* Liquid fill */}
      <path
        d={`M${w*0.21} ${h*0.62} L${w*0.18} ${h*0.825} Q${w*0.17} ${h*0.882} ${w*0.3} ${h*0.9} L${w*0.7} ${h*0.9} Q${w*0.83} ${h*0.882} ${w*0.82} ${h*0.825} L${w*0.79} ${h*0.62} Z`}
        fill="url(#lG)"
      />
      {/* Shine */}
      <path
        d={`M${w*0.25} ${h*0.38} Q${w*0.23} ${h*0.47} ${w*0.22} ${h*0.61} L${w*0.26} ${h*0.61} Q${w*0.27} ${h*0.47} ${w*0.29} ${h*0.38} Z`}
        fill="rgba(255,255,255,0.05)"
      />
      {/* Label background */}
      <rect x={w*0.26} y={h*0.465} width={w*0.48} height={h*0.22} rx="2"
        fill="rgba(6,4,2,0.72)" stroke="rgba(201,168,76,0.22)" strokeWidth="0.5" />
      {/* Label text */}
      <text x={w/2} y={h*0.524} textAnchor="middle" fontFamily="'Cinzel', serif"
        fontSize={w*0.036} fontWeight="600" letterSpacing="4" fill="#C9A84C">SOLEHEX</text>
      <line x1={w*0.3} y1={h*0.537} x2={w*0.7} y2={h*0.537} stroke="rgba(201,168,76,0.3)" strokeWidth="0.4" />
      <text x={w/2} y={h*0.562} textAnchor="middle" fontFamily="'Cormorant Garamond', serif"
        fontSize={w*0.03} fontStyle="italic" fill="rgba(242,234,211,0.7)">SIGNATURE</text>
      <text x={w/2} y={h*0.6} textAnchor="middle" fontFamily="'Cinzel', serif"
        fontSize={w*0.022} letterSpacing="2" fill="rgba(201,168,76,0.4)">EAU DE PARFUM</text>
      <line x1={w*0.3} y1={h*0.613} x2={w*0.7} y2={h*0.613} stroke="rgba(201,168,76,0.15)" strokeWidth="0.4" />
      <text x={w/2} y={h*0.645} textAnchor="middle" fontFamily="'Raleway', sans-serif"
        fontSize={w*0.023} fill="rgba(242,234,211,0.4)" letterSpacing="1.5">100 ml</text>
      {/* Base accent */}
      <path
        d={`M${w*0.2} ${h*0.84} Q${w*0.17} ${h*0.895} ${w*0.3} ${h*0.905} L${w*0.7} ${h*0.905} Q${w*0.83} ${h*0.895} ${w*0.8} ${h*0.84}`}
        fill="none" stroke="url(#gG)" strokeWidth="1.5" opacity="0.35"
      />
      <style>{`@keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-18px)} }`}</style>
    </svg>
  );
};

export default BottleSVG;

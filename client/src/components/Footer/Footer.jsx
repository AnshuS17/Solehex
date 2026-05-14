import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="footer-left">
      <div className="footer-logo">SOLEHEX</div>
      <div className="footer-tagline">Where darkness becomes desire</div>
      <div className="footer-social">
        {['Instagram', 'Pinterest', 'LinkedIn'].map(s => (
          <a key={s} href="#!" className="social-link">{s}</a>
        ))}
      </div>
    </div>

    <div className="footer-center">
      <div className="footer-divider" />
      <div className="footer-copy">© 2024 Maison Solehex. All rights reserved.</div>
    </div>

    <div className="footer-right">
      <ul className="footer-links">
        <li><Link to="#">Privacy Policy</Link></li>
        <li><Link to="#">Terms of Use</Link></li>
        <li><Link to="#">Shipping & Returns</Link></li>
        <li><Link to="#">Contact Maison</Link></li>
        <li><Link to="/shop">Boutique</Link></li>
        <li><Link to="/login">My Account</Link></li>
      </ul>
    </div>
  </footer>
);

export default Footer;

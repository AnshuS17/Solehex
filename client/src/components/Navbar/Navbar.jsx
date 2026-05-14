import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout, cartCount, setCartOpen } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <Link to="/" className="nav-logo">SOLEHEX</Link>

      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <li><Link to="/#story" onClick={() => setMenuOpen(false)}>Maison</Link></li>
        <li><Link to="/#notes" onClick={() => setMenuOpen(false)}>Fragrance</Link></li>
        <li><Link to="/#gallery" onClick={() => setMenuOpen(false)}>Collection</Link></li>
        <li><Link to="/shop" onClick={() => setMenuOpen(false)}>Boutique</Link></li>
        {user ? (
          <>
            {user.isAdmin && <li><Link to="/admin" onClick={() => setMenuOpen(false)}>Admin</Link></li>}
            <li><button className="nav-btn" onClick={() => { logout(); navigate('/'); }}>Logout</button></li>
          </>
        ) : (
          <li><Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link></li>
        )}
      </ul>

      <div className="nav-right">
        <button className="nav-cart-btn" onClick={() => setCartOpen(true)}>
          Bag {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </button>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

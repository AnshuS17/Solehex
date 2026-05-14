import React, { useEffect, useState } from 'react';
import api from '../api';
import { useApp } from '../context/AppContext';
import useReveal from '../hooks/useReveal';
import BottleSVG from '../components/BottleSVG';
import './Shop.css';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useApp();
  useReveal();

  useEffect(() => {
    api.get('/products')
      .then(r => setProducts(r.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="shop-page">
      <div className="shop-hero">
        <div className="shop-hero-bg" />
        <div className="eyebrow" style={{ justifyContent: 'center' }}>Maison Solehex</div>
        <h1 className="shop-title">The Boutique</h1>
        <p className="shop-sub">Every fragrance, a manifesto</p>
      </div>

      {loading ? (
        <div className="shop-loading">
          <div className="loading-dot" /><div className="loading-dot" /><div className="loading-dot" />
        </div>
      ) : (
        <div className="shop-grid">
          {products.map((p, i) => (
            <div key={p._id} className={`shop-card reveal reveal-d${(i % 4) + 1}`}>
              <div className="sc-visual">
                <div className="sc-glow" />
                <BottleSVG size="default" />
                {p.edition && <span className="sc-edition">{p.edition}</span>}
              </div>
              <div className="sc-info">
                <div className="sc-name">{p.name}</div>
                <div className="sc-sub">{p.concentration} — {p.volume}</div>
                <div className="sc-tagline">{p.tagline}</div>
                <div className="sc-bottom">
                  <span className="sc-price">{p.currency}{p.price?.toLocaleString('en-IN')}</span>
                  <button
                    className="btn-primary"
                    onClick={() => addToCart(p._id)}
                    disabled={p.countInStock === 0}
                  >
                    <span>{p.countInStock === 0 ? 'Sold Out' : 'Add to Bag'}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Shop;

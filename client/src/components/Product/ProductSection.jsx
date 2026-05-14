import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import BottleSVG from '../BottleSVG';
import './ProductSection.css';

const ProductSection = ({ product }) => {
  const { addToCart } = useApp();
  const [adding, setAdding] = useState(false);

  const handleAdd = async () => {
    if (!product) return;
    setAdding(true);
    await addToCart(product._id);
    setTimeout(() => setAdding(false), 1500);
  };

  const price = product
    ? `${product.currency || '₹'}${product.price?.toLocaleString('en-IN')}`
    : '₹18,500';

  return (
    <section className="product-section" id="product">
      <div className="ps-visual reveal">
        <div className="ps-glow" />
        <BottleSVG size="default" />
      </div>

      <div className="ps-info reveal reveal-d2">
        <div className="eyebrow">The Signature Edition</div>
        <h2 className="ps-name">
          {product?.name?.split(' ')[0] || 'SOLEHEX'}<br />
          <span>{product?.name?.split(' ')[1] || 'SIGNATURE'}</span>
        </h2>
        <div className="ps-sub">{product?.concentration || 'Eau de Parfum'} — {product?.volume || '100 ml'}</div>
        <p className="ps-desc">
          {product?.description || 'A limited opus of darkness and light — the distillation of our founding vision. Presented in hand-weighted crystal, sealed with 24-karat gold leaf, and wrapped in Italian black tissue.'}
        </p>

        <div className="ps-meta">
          <div className="meta-item">
            <div className="meta-label">Concentration</div>
            <div className="meta-value">{product?.concentration || 'Eau de Parfum'}</div>
          </div>
          <div className="meta-item">
            <div className="meta-label">Volume</div>
            <div className="meta-value">{product?.volume || '100 ml'}</div>
          </div>
          <div className="meta-item">
            <div className="meta-label">Edition</div>
            <div className="meta-value">{product?.edition || 'Limitée'}</div>
          </div>
        </div>

        <div className="ps-price-row">
          <span className="ps-price">{price}</span>
          <span className="ps-price-note">Free worldwide shipping</span>
        </div>

        {product?.countInStock === 0 && (
          <p className="ps-out">— Out of Stock —</p>
        )}

        <div className="ps-cta">
          <button
            className="btn-primary"
            onClick={handleAdd}
            disabled={adding || product?.countInStock === 0}
          >
            <span>{adding ? 'Added to Bag ✓' : 'Add to Bag'}</span>
          </button>
          <button className="btn-secondary">Buy Now</button>
        </div>

        <div className="ps-perks">
          {['Complimentary Gift Wrapping', 'Authenticity Certificate', '30-Day Returns'].map((p) => (
            <div key={p} className="ps-perk">
              <span className="perk-dot" />
              {p}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;

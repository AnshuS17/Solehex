import React from 'react';
import { useApp } from '../../context/AppContext';
import './Cart.css';

const Cart = () => {
  const { cart, cartOpen, setCartOpen, updateCart, removeFromCart, cartTotal, user } = useApp();

  if (!cartOpen) return null;

  return (
    <>
      <div className="cart-backdrop" onClick={() => setCartOpen(false)} />
      <aside className="cart-drawer">
        <div className="cart-head">
          <span className="cart-title">Your Bag</span>
          <button className="cart-close" onClick={() => setCartOpen(false)}>✕</button>
        </div>

        {cart.length === 0 ? (
          <div className="cart-empty">
            <p>Your bag is empty.</p>
            <button className="btn-secondary" onClick={() => setCartOpen(false)}>Continue Shopping</button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item) => (
                <div key={item.product?._id} className="cart-item">
                  <div className="ci-bottle">
                    <svg viewBox="0 0 60 100" xmlns="http://www.w3.org/2000/svg" width="50" height="80">
                      <rect x="22" y="14" width="16" height="12" rx="2" fill="rgba(201,168,76,0.4)" />
                      <path d="M18 28 Q12 34 11 42 L9 82 Q8 90 18 92 L42 92 Q52 90 51 82 L49 42 Q48 34 42 28 Z"
                        fill="rgba(30,18,8,0.9)" stroke="rgba(201,168,76,0.3)" strokeWidth="0.5" />
                      <path d="M11 68 L9 82 Q8 90 18 92 L42 92 Q52 90 51 82 L49 68 Z" fill="rgba(107,15,26,0.4)" />
                      <text x="30" y="58" textAnchor="middle" fontFamily="Cinzel, serif" fontSize="4.5" letterSpacing="1" fill="rgba(201,168,76,0.7)">SLX</text>
                    </svg>
                  </div>
                  <div className="ci-info">
                    <div className="ci-name">{item.product?.name || 'Solehex'}</div>
                    <div className="ci-sub">{item.product?.concentration} — {item.product?.volume}</div>
                    <div className="ci-price">
                      {item.product?.currency}{item.product?.price?.toLocaleString('en-IN')}
                    </div>
                    <div className="ci-qty">
                      <button onClick={() => updateCart(item.product._id, item.quantity - 1)}>−</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateCart(item.product._id, item.quantity + 1)}>+</button>
                      <button className="ci-remove" onClick={() => removeFromCart(item.product._id)}>Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-subtotal">
                <span>Subtotal</span>
                <span className="cart-total-val">₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
              <p className="cart-ship">Complimentary shipping on all orders</p>
              {user ? (
                <button className="btn-primary" style={{ width: '100%' }}>
                  <span>Proceed to Checkout</span>
                </button>
              ) : (
                <button className="btn-secondary" style={{ width: '100%' }}
                  onClick={() => { setCartOpen(false); window.location.href = '/login'; }}>
                  Login to Checkout
                </button>
              )}
            </div>
          </>
        )}
      </aside>
    </>
  );
};

export default Cart;

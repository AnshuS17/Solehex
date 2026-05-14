import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../api';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('solehex_user') || 'null'));
  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    setUser(data);
    localStorage.setItem('solehex_user', JSON.stringify(data));
    return data;
  };

  const register = async (name, email, password) => {
    const { data } = await api.post('/auth/register', { name, email, password });
    setUser(data);
    localStorage.setItem('solehex_user', JSON.stringify(data));
    return data;
  };

  const logout = () => {
    setUser(null);
    setCart([]);
    localStorage.removeItem('solehex_user');
  };

  const fetchCart = useCallback(async () => {
    if (!user) return;
    try {
      const { data } = await api.get('/cart');
      setCart(data);
    } catch { /* silent */ }
  }, [user]);

  useEffect(() => { fetchCart(); }, [fetchCart]);

  const addToCart = async (productId, quantity = 1) => {
    if (!user) { showToast('Please login to add to cart'); return; }
    try {
      const { data } = await api.post('/cart', { productId, quantity });
      setCart(data);
      showToast('Added to bag');
      setCartOpen(true);
    } catch (err) { showToast(err.response?.data?.message || 'Error'); }
  };

  const updateCart = async (productId, quantity) => {
    const { data } = await api.put(`/cart/${productId}`, { quantity });
    setCart(data);
  };

  const removeFromCart = async (productId) => {
    const { data } = await api.delete(`/cart/${productId}`);
    setCart(data);
  };

  const cartTotal = cart.reduce((sum, i) => sum + (i.product?.price || 0) * i.quantity, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <AppContext.Provider value={{
      user, login, register, logout,
      cart, addToCart, updateCart, removeFromCart, cartTotal, cartCount,
      toast, showToast, cartOpen, setCartOpen,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);

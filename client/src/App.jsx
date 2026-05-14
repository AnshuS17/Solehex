import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar/Navbar';
import Cart from './components/Cart/Cart';
import Footer from './components/Footer/Footer';
import Cursor from './components/Cursor';
import Toast from './components/Toast';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Login from './pages/Login';
import Admin from './pages/Admin';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Cursor />
        <Navbar />
        <Cart />
        <Toast />
        <Routes>
          <Route path="/"      element={<Home />} />
          <Route path="/shop"  element={<Shop />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;

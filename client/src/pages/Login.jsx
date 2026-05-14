import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './AuthPage.css';

const Login = () => {
  const { login, register, showToast } = useApp();
  const navigate = useNavigate();
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handle = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      if (mode === 'login') {
        await login(form.email, form.password);
      } else {
        await register(form.name, form.email, form.password);
      }
      showToast('Welcome to Solehex');
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-bg" />
      <div className="auth-box">
        <Link to="/" className="auth-logo">SOLEHEX</Link>
        <p className="auth-tagline">
          {mode === 'login' ? 'Welcome back to the Maison' : 'Join the Maison Solehex'}
        </p>

        <div className="auth-toggle">
          <button className={mode === 'login' ? 'active' : ''} onClick={() => setMode('login')}>Login</button>
          <button className={mode === 'register' ? 'active' : ''} onClick={() => setMode('register')}>Register</button>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form className="auth-form" onSubmit={handle}>
          {mode === 'register' && (
            <div className="auth-field">
              <label>Full Name</label>
              <input type="text" value={form.name} required
                onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>
          )}
          <div className="auth-field">
            <label>Email</label>
            <input type="email" value={form.email} required
              onChange={e => setForm({ ...form, email: e.target.value })} />
          </div>
          <div className="auth-field">
            <label>Password</label>
            <input type="password" value={form.password} required minLength={6}
              onChange={e => setForm({ ...form, password: e.target.value })} />
          </div>
          <button className="btn-primary auth-submit" type="submit" disabled={loading}>
            <span>{loading ? 'Please wait…' : mode === 'login' ? 'Enter the Maison' : 'Create Account'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

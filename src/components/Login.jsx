import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/api';
import Particle from './Particle';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login({ email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.username);
      navigate('/dashboard');
    } catch (error) {
      alert('Login failed: ' + (error.response?.data?.message || 'Unknown error'));
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 position-relative">
      <Particle /> 
      <div className="card p-4 shadow-lg" style={{ maxWidth: '400px', width: '100%', zIndex: 2, background: 'rgba(255, 255, 255, 0.95)', borderRadius: '15px' }}>
        <div className="card-header bg-primary text-white text-center py-3">
          <h3 className="mb-0">Welcome Back</h3>
          <small>Login to your Expense Tracker</small>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-bold">Email</label>
              <input
                type="email"
                className="form-control form-control-lg"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                aria-describedby="emailHelp"
              />
              <div id="emailHelp" className="form-text text-muted">
                We'll never share your email.
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="form-label fw-bold">Password</label>
              <input
                type="password"
                className="form-control form-control-lg"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary btn-lg w-100 rounded-pill">
              Login
            </button>
          </form>
        </div>
        <div className="card-footer text-center text-muted py-2">
          <small>
            Don’t have an account?{' '}
            <a href="/signup" className="text-primary text-decoration-none">
              Sign up here
            </a>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Login;
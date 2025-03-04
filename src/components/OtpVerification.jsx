import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { verifyOtp } from '../api/api';
import Particle from './Particle';
import { Spinner } from 'react-bootstrap';

const OtpVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = location.state || {};
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await verifyOtp({ email, otp });
      setLoading(false);
      navigate('/dashboard'); // Redirect to dashboard after verification
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.message || 'OTP verification failed');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 position-relative">
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        <Particle />
      </div>
      <div
        className="card p-4 shadow-lg"
        style={{ maxWidth: '400px', width: '100%', zIndex: 2, background: 'rgba(255, 255, 255, 0.95)', borderRadius: '15px' }}
      >
        <div className="card-body">
          <h3 className="text-center mb-4">Verify OTP for SpendSmart</h3>
          {loading ? (
            <div className="d-flex justify-content-center align-items-center">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="otp" className="form-label fw-bold">Enter OTP</label>
                <input
                  type="text"
                  className={`form-control form-control-lg ${error ? 'is-invalid' : ''}`}
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter 6-digit OTP"
                  required
                  pattern="\d{6}"
                  maxLength="6"
                />
                {error && <div className="invalid-feedback">{error}</div>}
                <div className="form-text text-muted">Check your email for the OTP sent to {email}</div>
              </div>
              <button type="submit" className="btn btn-primary btn-lg w-100 rounded-pill">
                Verify OTP
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
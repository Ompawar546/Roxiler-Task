import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import {
  validateName,
  validateEmail,
  validateAddress,
  validatePassword,
} from '../../utils/validators';


export default function Signup() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (form.name.trim().length < 3) newErrors.name = 'Name must be at least 3 characters';
    if (!validateEmail(form.email)) newErrors.email = 'Invalid email';
    if (!validateAddress(form.address)) newErrors.address = 'Max 400 characters';
    if (!validatePassword(form.password)) {
      newErrors.password = '8–16 chars, 1 uppercase & 1 special char required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, {

        ...form,
        role: 'user', // Normal user
      });
      alert('Signup successful! Please login.');
      navigate('/');
    } catch (err) {
      alert(err?.response?.data?.message || 'Signup failed');
    }
  };

  const containerStyle = {
    minHeight: '100vh',
    width: '100vw',
    position: 'fixed',
    top: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    boxSizing: 'border-box'
  };

  const formStyle = {
    background: 'white',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  };

  const titleStyle = {
    textAlign: 'center',
    color: '#333',
    marginBottom: '10px',
    fontSize: '28px',
    fontWeight: 'bold'
  };

  const inputStyle = {
    padding: '12px 16px',
    border: '2px solid #e1e5e9',
    borderRadius: '8px',
    fontSize: '16px',
    transition: 'border-color 0.3s ease',
    outline: 'none'
  };

  const inputFocusStyle = {
    borderColor: '#667eea'
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: '80px',
    resize: 'vertical',
    fontFamily: 'inherit'
  };

  const buttonStyle = {
    padding: '14px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
  };

  const buttonHoverStyle = {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)'
  };

  const errorStyle = {
    color: '#e74c3c',
    fontSize: '14px',
    marginTop: '-15px',
    marginBottom: '5px'
  };

  const linkStyle = {
    textAlign: 'center',
    color: '#666',
    fontSize: '14px'
  };

  const linkAnchorStyle = {
    color: '#667eea',
    textDecoration: 'none',
    fontWeight: 'bold'
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSignup} style={formStyle}>
        <h2 style={titleStyle}>Create Account</h2>

        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          style={inputStyle}
          onFocus={(e) => e.target.style.borderColor = inputFocusStyle.borderColor}
          onBlur={(e) => e.target.style.borderColor = '#e1e5e9'}
        />
        {errors.name && <p style={errorStyle}>{errors.name}</p>}

        <input
          name="email"
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          style={inputStyle}
          onFocus={(e) => e.target.style.borderColor = inputFocusStyle.borderColor}
          onBlur={(e) => e.target.style.borderColor = '#e1e5e9'}
        />
        {errors.email && <p style={errorStyle}>{errors.email}</p>}

        <textarea
          name="address"
          placeholder="Your Address"
          value={form.address}
          onChange={handleChange}
          style={textareaStyle}
          onFocus={(e) => e.target.style.borderColor = inputFocusStyle.borderColor}
          onBlur={(e) => e.target.style.borderColor = '#e1e5e9'}
        />
        {errors.address && <p style={errorStyle}>{errors.address}</p>}

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          style={inputStyle}
          onFocus={(e) => e.target.style.borderColor = inputFocusStyle.borderColor}
          onBlur={(e) => e.target.style.borderColor = '#e1e5e9'}
        />
        {errors.password && <p style={errorStyle}>{errors.password}</p>}

        <button 
          type="submit" 
          style={buttonStyle}
          onMouseEnter={(e) => {
            e.target.style.transform = buttonHoverStyle.transform;
            e.target.style.boxShadow = buttonHoverStyle.boxShadow;
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'none';
            e.target.style.boxShadow = 'none';
          }}
        >
          Create Account
        </button>

        <p style={linkStyle}>
          Already have an account?{' '}
          <Link to="/" style={linkAnchorStyle}>
            Sign in here
          </Link>
        </p>
      </form>
    </div>
  );
}
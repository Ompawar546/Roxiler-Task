import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, form);
      const { token, role } = res.data;
      localStorage.setItem('token', token);
      navigate(`/${role}`);
    } catch (err) {
      alert('Login failed');
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
      <form onSubmit={handleLogin} style={formStyle}>
        <h2 style={titleStyle}>Welcome Back</h2>
        
        <input
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          style={inputStyle}
          onFocus={(e) => e.target.style.borderColor = inputFocusStyle.borderColor}
          onBlur={(e) => e.target.style.borderColor = '#e1e5e9'}
        />
        
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
          style={inputStyle}
          onFocus={(e) => e.target.style.borderColor = inputFocusStyle.borderColor}
          onBlur={(e) => e.target.style.borderColor = '#e1e5e9'}
        />
        
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
          Sign In
        </button>

        <p style={linkStyle}>
          Don't have an account?{' '}
          <Link to="/signup" style={linkAnchorStyle}>
            Create one here
          </Link>
        </p>
      </form>
    </div>
  );
}
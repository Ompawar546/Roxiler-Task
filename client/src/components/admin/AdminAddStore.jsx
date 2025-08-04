import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const AdminAddStore = () => {
  const [form, setForm] = useState({ name: '', email: '', address: '' });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsLoading(true);

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('/api/stores', form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage('✅ Store added successfully');
      setForm({ name: '', email: '', address: '' });

      setTimeout(() => {
        navigate('/admin/stores');
      }, 1500);
    } catch (err) {
      const errMsg = err?.response?.data?.msg || 'Error adding store';
      setMessage(`❌ ${errMsg}`);
    } finally {
      setIsLoading(false);
    }
  };

  const containerStyle = {
    display: 'flex',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    width: '100vw',
    height: '100vh',
    margin: 0,
    padding: 0,
    overflow: 'hidden'
  };

  const sidebarStyle = {
    width: '250px',
    minWidth: '250px',
    padding: '2rem 1.5rem',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    height: '100vh',
    boxShadow: '2px 0 10px rgba(0,0,0,0.1)',
    overflowY: 'auto'
  };

  const navLinkStyle = {
    display: 'block',
    color: 'white',
    textDecoration: 'none',
    padding: '12px 16px',
    marginBottom: '8px',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
    fontSize: '14px',
    fontWeight: '500'
  };

  const navLinkHoverStyle = {
    backgroundColor: 'rgba(255,255,255,0.2)',
    transform: 'translateX(5px)'
  };

  const contentStyle = {
    flex: 1,
    padding: '2rem 3rem',
    backgroundColor: '#f8fafc',
    height: '100vh',
    overflowY: 'auto',
    width: 'calc(100vw - 250px)'
  };

  const titleStyle = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: '0.5rem',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  };

  const sidebarTitleStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '2rem',
    textAlign: 'center',
    color: 'white'
  };

  const formCardStyle = {
    backgroundColor: 'white',
    padding: '3rem',
    borderRadius: '16px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1), 0 5px 10px rgba(0,0,0,0.05)',
    border: '1px solid #e2e8f0',
    maxWidth: '600px',
    margin: '2rem 0'
  };

  const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    border: '2px solid #e2e8f0',
    borderRadius: '10px',
    fontSize: '16px',
    transition: 'all 0.3s ease',
    fontFamily: 'inherit',
    backgroundColor: '#f8fafc'
  };

  const inputFocusStyle = {
    ...inputStyle,
    borderColor: '#4f46e5',
    backgroundColor: 'white',
    boxShadow: '0 0 0 3px rgba(79, 70, 229, 0.1)'
  };

  const labelStyle = {
    fontSize: '14px',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '6px',
    display: 'block'
  };

  const buttonStyle = {
    backgroundColor: '#4f46e5',
    color: 'white',
    padding: '14px 32px',
    border: 'none',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    width: '100%',
    marginTop: '1rem'
  };

  const buttonHoverStyle = {
    ...buttonStyle,
    backgroundColor: '#4338ca',
    transform: 'translateY(-2px)',
    boxShadow: '0 10px 25px rgba(79, 70, 229, 0.3)'
  };

  const messageStyle = {
    padding: '12px 16px',
    borderRadius: '8px',
    marginBottom: '1rem',
    fontSize: '14px',
    fontWeight: '500'
  };

  const successMessageStyle = {
    ...messageStyle,
    backgroundColor: '#d1fae5',
    color: '#065f46',
    border: '1px solid #a7f3d0'
  };

  const errorMessageStyle = {
    ...messageStyle,
    backgroundColor: '#fee2e2',
    color: '#991b1b',
    border: '1px solid #fecaca'
  };

  return (
    <div style={containerStyle}>
      {/* Navigation Sidebar */}
      <nav style={sidebarStyle}>
        <h2 style={sidebarTitleStyle}>Admin Panel</h2>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          <li>
            <Link 
              to="/admin/dashboard" 
              style={navLinkStyle}
              onMouseEnter={(e) => Object.assign(e.target.style, navLinkHoverStyle)}
              onMouseLeave={(e) => Object.assign(e.target.style, navLinkStyle)}
            >
              📊 Dashboard
            </Link>
          </li>
          <li>
            <Link 
              to="/admin/users" 
              style={navLinkStyle}
              onMouseEnter={(e) => Object.assign(e.target.style, navLinkHoverStyle)}
              onMouseLeave={(e) => Object.assign(e.target.style, navLinkStyle)}
            >
              👥 Manage Users
            </Link>
          </li>
          <li>
            <Link 
              to="/admin/stores" 
              style={navLinkStyle}
              onMouseEnter={(e) => Object.assign(e.target.style, navLinkHoverStyle)}
              onMouseLeave={(e) => Object.assign(e.target.style, navLinkStyle)}
            >
              🏬 Manage Stores
            </Link>
          </li>
          <li>
            <Link 
              to="/admin/stores/add" 
              style={{...navLinkStyle, backgroundColor: 'rgba(255,255,255,0.2)'}}
              onMouseEnter={(e) => Object.assign(e.target.style, navLinkHoverStyle)}
              onMouseLeave={(e) => Object.assign(e.target.style, {...navLinkStyle, backgroundColor: 'rgba(255,255,255,0.2)'})}
            >
              ➕ Add Store
            </Link>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <div style={contentStyle}>
        <h1 style={titleStyle}>➕ Add New Store</h1>
        <p style={{ color: '#64748b', fontSize: '1.1rem', marginBottom: '2rem' }}>
          Create a new store in your platform. Fill in the details below.
        </p>

        <div style={formCardStyle}>
          {message && (
            <div style={message.includes('✅') ? successMessageStyle : errorMessageStyle}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={labelStyle}>Store Name *</label>
              <input
                type="text"
                name="name"
                placeholder="Enter store name"
                value={form.name}
                onChange={handleChange}
                required
                style={inputStyle}
                onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                onBlur={(e) => Object.assign(e.target.style, inputStyle)}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={labelStyle}>Store Email (Optional)</label>
              <input
                type="email"
                name="email"
                placeholder="Enter store email"
                value={form.email}
                onChange={handleChange}
                style={inputStyle}
                onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                onBlur={(e) => Object.assign(e.target.style, inputStyle)}
              />
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label style={labelStyle}>Store Address *</label>
              <textarea
                name="address"
                placeholder="Enter full store address"
                value={form.address}
                onChange={handleChange}
                required
                rows="4"
                style={{...inputStyle, resize: 'vertical', minHeight: '100px'}}
                onFocus={(e) => Object.assign(e.target.style, {...inputFocusStyle, resize: 'vertical', minHeight: '100px'})}
                onBlur={(e) => Object.assign(e.target.style, {...inputStyle, resize: 'vertical', minHeight: '100px'})}
              />
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              style={buttonStyle}
              onMouseEnter={(e) => !isLoading && Object.assign(e.target.style, buttonHoverStyle)}
              onMouseLeave={(e) => !isLoading && Object.assign(e.target.style, buttonStyle)}
            >
              {isLoading ? '⏳ Adding Store...' : '➕ Add Store'}
            </button>
          </form>

          <div style={{ 
            marginTop: '2rem', 
            paddingTop: '1rem', 
            borderTop: '1px solid #e2e8f0',
            textAlign: 'center'
          }}>
            <Link 
              to="/admin/stores" 
              style={{
                color: '#6366f1',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.color = '#4338ca'}
              onMouseLeave={(e) => e.target.style.color = '#6366f1'}
            >
              ← Back to Stores List
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAddStore;
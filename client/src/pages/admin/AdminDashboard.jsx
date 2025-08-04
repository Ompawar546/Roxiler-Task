import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStores: 0,
    totalRatings: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/admin/stats', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(res.data);
      } catch (err) {
        console.error('Failed to fetch stats:', err.response?.data || err.message);
      }
    };

    fetchStats();
  }, []);

  const containerStyle = {
    display: 'flex',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    width: '100vw', // Full viewport width
    height: '100vh', // Full viewport height
    margin: 0,
    padding: 0,
    overflow: 'hidden' // Prevent scrollbars from container
  };

  const sidebarStyle = {
    width: '250px',
    minWidth: '250px', // Prevent shrinking
    padding: '2rem 1.5rem',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    height: '100vh',
    boxShadow: '2px 0 10px rgba(0,0,0,0.1)',
    overflowY: 'auto' // Allow sidebar scrolling if needed
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
    flex: 1, // Take remaining space
    padding: '2rem 3rem',
    backgroundColor: '#f8fafc',
    height: '100vh',
    overflowY: 'auto', // Allow content scrolling
    width: 'calc(100vw - 250px)' // Ensure it takes remaining width
  };

  const statsContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
    marginTop: '2rem',
    width: '100%' // Ensure full width usage
  };

  const statCardStyle = {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.1)',
    border: '1px solid #e2e8f0',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    textAlign: 'center'
  };

  const statCardHoverStyle = {
    transform: 'translateY(-5px)',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1), 0 5px 10px rgba(0,0,0,0.05)'
  };

  const statNumberStyle = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#4f46e5',
    margin: '1rem 0',
    display: 'block'
  };

  const statLabelStyle = {
    fontSize: '1.1rem',
    color: '#64748b',
    fontWeight: '600',
    margin: 0
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

  return (
    <div style={containerStyle}>
      {/* Navigation */}
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
              style={navLinkStyle}
              onMouseEnter={(e) => Object.assign(e.target.style, navLinkHoverStyle)}
              onMouseLeave={(e) => Object.assign(e.target.style, navLinkStyle)}
            >
              ➕ Add Store
            </Link>
          </li>
        </ul>
      </nav>

      {/* Dashboard Content */}
      <div style={contentStyle}>
        <h1 style={titleStyle}>📊 Admin Dashboard</h1>
        <p style={{ color: '#64748b', fontSize: '1.1rem', marginBottom: '2rem' }}>
          Welcome to your admin dashboard. Here's an overview of your platform.
        </p>
        
        <div style={statsContainerStyle}>
          <div 
            style={statCardStyle}
            onMouseEnter={(e) => Object.assign(e.target.style, {...statCardStyle, ...statCardHoverStyle})}
            onMouseLeave={(e) => Object.assign(e.target.style, statCardStyle)}
          >
            <h3 style={statLabelStyle}>Total Users</h3>
            <span style={statNumberStyle}>{stats.totalUsers.toLocaleString()}</span>
            <div style={{ 
              width: '50px', 
              height: '4px', 
              backgroundColor: '#10b981', 
              borderRadius: '2px', 
              margin: '0 auto' 
            }}></div>
          </div>
          
          <div 
            style={statCardStyle}
            onMouseEnter={(e) => Object.assign(e.target.style, {...statCardStyle, ...statCardHoverStyle})}
            onMouseLeave={(e) => Object.assign(e.target.style, statCardStyle)}
          >
            <h3 style={statLabelStyle}>Total Stores</h3>
            <span style={statNumberStyle}>{stats.totalStores.toLocaleString()}</span>
            <div style={{ 
              width: '50px', 
              height: '4px', 
              backgroundColor: '#f59e0b', 
              borderRadius: '2px', 
              margin: '0 auto' 
            }}></div>
          </div>
          
          <div 
            style={statCardStyle}
            onMouseEnter={(e) => Object.assign(e.target.style, {...statCardStyle, ...statCardHoverStyle})}
            onMouseLeave={(e) => Object.assign(e.target.style, statCardStyle)}
          >
            <h3 style={statLabelStyle}>Total Ratings</h3>
            <span style={statNumberStyle}>{stats.totalRatings.toLocaleString()}</span>
            <div style={{ 
              width: '50px', 
              height: '4px', 
              backgroundColor: '#ef4444', 
              borderRadius: '2px', 
              margin: '0 auto' 
            }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function UserDashboard() {
  const [stores, setStores] = useState([]);
  const [ratings, setRatings] = useState({});

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/user/stores', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStores(res.data);
    } catch (err) {
      console.error('Error fetching stores:', err.response?.data || err.message);
    }
  };

  const handleRateChange = (storeId, value) => {
    setRatings({ ...ratings, [storeId]: value });
  };

  const handleSubmitRating = async (storeId) => {
    const value = ratings[storeId];
    if (!value) return alert('Please select a rating value');

    try {
      await axios.post(
        `http://localhost:5000/api/user/rate/${storeId}`,
        { value },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert('Rating submitted!');
      fetchStores(); // Refresh
    } catch (err) {
      alert(err.response?.data?.msg || 'Rating failed');
    }
  };

  const containerStyle = {
    minHeight: '100vh',
    width: '100vw',
    position: 'fixed',
    top: 0,
    left: 0,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    boxSizing: 'border-box',
    overflow: 'auto'
  };

  const contentStyle = {
    maxWidth: '800px',
    margin: '0 auto',
    background: 'white',
    borderRadius: '12px',
    padding: '40px',
    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
    minHeight: 'calc(100vh - 40px)',
    boxSizing: 'border-box'
  };

  const titleStyle = {
    color: '#333',
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '10px',
    textAlign: 'center'
  };

  const subtitleStyle = {
    color: '#666',
    fontSize: '18px',
    marginBottom: '30px',
    textAlign: 'center'
  };

  const storeCardStyle = {
    background: '#f8f9fa',
    border: '2px solid #e9ecef',
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '20px',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
  };

  const storeCardHoverStyle = {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)'
  };

  const storeNameStyle = {
    color: '#333',
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '12px'
  };

  const storeInfoStyle = {
    color: '#666',
    fontSize: '16px',
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  const ratingContainerStyle = {
    marginTop: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  };

  const selectStyle = {
    padding: '8px 12px',
    border: '2px solid #e1e5e9',
    borderRadius: '6px',
    fontSize: '14px',
    outline: 'none',
    cursor: 'pointer',
    transition: 'border-color 0.3s ease'
  };

  const buttonStyle = {
    padding: '8px 16px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
  };

  const buttonHoverStyle = {
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
  };

  const alreadyRatedStyle = {
    color: '#28a745',
    fontSize: '14px',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    marginTop: '16px'
  };

  const starRatingStyle = {
    background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
    color: '#333',
    padding: '4px 8px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: 'bold'
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <h2 style={titleStyle}>Welcome, User!</h2>
        <h3 style={subtitleStyle}>Browse Stores & Submit Ratings</h3>

        {stores.map((store) => (
          <div 
            key={store.id} 
            style={storeCardStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = storeCardHoverStyle.transform;
              e.currentTarget.style.boxShadow = storeCardHoverStyle.boxShadow;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
            }}
          >
            <h4 style={storeNameStyle}>{store.name}</h4>
            <p style={storeInfoStyle}>
              <span>📍</span>
              {store.address}
            </p>
            <p style={storeInfoStyle}>
              <span>⭐</span>
              Average Rating: 
              <span style={starRatingStyle}>{store.avgRating || 'No ratings yet'}</span>
            </p>

            {store.userRatings.find((r) => r.userId === parseInt(localStorage.getItem('userId'))) ? (
              <p style={alreadyRatedStyle}>
                <span>✅</span>
                You already rated this store
              </p>
            ) : (
              <div style={ratingContainerStyle}>
                <select 
                  onChange={(e) => handleRateChange(store.id, e.target.value)} 
                  defaultValue=""
                  style={selectStyle}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e1e5e9'}
                >
                  <option value="" disabled>
                    Select rating
                  </option>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num} Star{num > 1 ? 's' : ''}
                    </option>
                  ))}
                </select>
                <button 
                  onClick={() => handleSubmitRating(store.id)}
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
                  Submit Rating
                </button>
              </div>
            )}
          </div>
        ))}

        {stores.length === 0 && (
          <div style={{ textAlign: 'center', color: '#666', fontSize: '18px', marginTop: '40px' }}>
            No stores available at the moment.
          </div>
        )}
      </div>
    </div>
  );
}
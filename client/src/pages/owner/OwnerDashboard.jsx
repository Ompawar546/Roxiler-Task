import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function OwnerDashboard() {
  const [myStores, setMyStores] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchMyStores = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/owner/my-stores', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMyStores(res.data);
      } catch (err) {
        console.error('Failed to fetch owner stores:', err.response?.data || err.message);
      }
    };

    fetchMyStores();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Welcome, Store Owner!</h2>
      <h3>Your Stores & Customer Ratings</h3>

      {myStores.map((store) => (
        <div key={store.id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
          <h4>{store.name}</h4>
          <p>📍 {store.address}</p>
          <p>📧 {store.email}</p>
          <p>⭐ Average Rating: {store.avgRating}</p>
          <h5>Customer Ratings:</h5>
          {store.userRatings.length ? (
            <ul>
              {store.userRatings.map((r, i) => (
                <li key={i}>User ID: {r.userId} ➡️ {r.value} stars</li>
              ))}
            </ul>
          ) : (
            <p style={{ color: 'gray' }}>No ratings yet.</p>
          )}
        </div>
      ))}
    </div>
  );
}

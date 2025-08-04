import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminStoreList = () => {
  const [stores, setStores] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/admin/stores', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStores(res.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch stores');
      }
    };
    fetchStores();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">All Stores</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">#</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Address</th>
              <th className="px-4 py-2 border">Avg Rating</th>
            </tr>
          </thead>
          <tbody>
            {stores.map((store, index) => (
              <tr key={store.id} className="text-center">
                <td className="px-4 py-2 border">{index + 1}</td>
                <td className="px-4 py-2 border">{store.name}</td>
                <td className="px-4 py-2 border">{store.email}</td>
                <td className="px-4 py-2 border">{store.address}</td>
                <td className="px-4 py-2 border">{store.avgRating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminStoreList;

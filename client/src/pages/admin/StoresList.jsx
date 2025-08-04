import { useEffect, useState } from 'react';
import axios from 'axios';

export default function StoresList() {
  const [stores, setStores] = useState([]);
  const [filters, setFilters] = useState({
    name: '',
    email: '',
    address: '',
  });

  const fetchStores = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/admin/stores`, {
        headers: { Authorization: `Bearer ${token}` },
        params: filters,
      });
      setStores(res.data);
    } catch (err) {
      console.error('Failed to fetch stores', err);
    }
  };

  useEffect(() => {
    fetchStores();
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>All Stores</h2>

      <div>
        <input name="name" placeholder="Filter by name" onChange={handleFilterChange} />
        <input name="email" placeholder="Filter by email" onChange={handleFilterChange} />
        <input name="address" placeholder="Filter by address" onChange={handleFilterChange} />
      </div>

      <table border={1} cellPadding={10}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Average Rating</th>
          </tr>
        </thead>
        <tbody>
          {stores.map((s) => (
            <tr key={s._id}>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.address}</td>
              <td>{s.rating ? s.rating.toFixed(1) : 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

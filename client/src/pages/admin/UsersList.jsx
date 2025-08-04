import { useEffect, useState } from 'react';
import axios from 'axios';

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({
    name: '',
    email: '',
    address: '',
    role: '',
  });

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
        params: filters,
      });
      setUsers(res.data);
    } catch (err) {
      console.error('Failed to fetch users', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>All Users</h2>

      <div>
        <input name="name" placeholder="Filter by name" onChange={handleFilterChange} />
        <input name="email" placeholder="Filter by email" onChange={handleFilterChange} />
        <input name="address" placeholder="Filter by address" onChange={handleFilterChange} />
        <select name="role" onChange={handleFilterChange}>
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="user">Normal User</option>
          <option value="store-owner">Store Owner</option>
        </select>
      </div>

      <table border={1} cellPadding={10}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Role</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.address}</td>
              <td>{u.role}</td>
              <td>{u.role === 'store-owner' ? (u.rating || 'N/A') : '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

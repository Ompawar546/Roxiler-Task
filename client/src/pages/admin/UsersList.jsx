import { useEffect, useState } from 'react';
import axios from 'axios';

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  title: {
    color: '#333',
    marginBottom: '20px',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  filtersContainer: {
    display: 'flex',
    gap: '15px',
    marginBottom: '25px',
    flexWrap: 'wrap',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    border: '1px solid #e9ecef',
  },
  input: {
    padding: '8px 12px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    minWidth: '150px',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  select: {
    padding: '8px 12px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    minWidth: '150px',
    outline: 'none',
    backgroundColor: 'white',
    cursor: 'pointer',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: 'white',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    borderRadius: '8px',
    overflow: 'hidden',
    border: '1px solid #ddd',
  },
  th: {
    backgroundColor: '#4a5568',
    color: 'white',
    padding: '12px 15px',
    textAlign: 'left',
    fontWeight: 'bold',
    borderBottom: '2px solid #2d3748',
  },
  td: {
    padding: '12px 15px',
    borderBottom: '1px solid #e2e8f0',
    color: '#4a5568',
  },
  tr: {
    transition: 'background-color 0.2s',
  },
  roleBadge: {
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  adminBadge: {
    backgroundColor: '#fed7d7',
    color: '#c53030',
  },
  userBadge: {
    backgroundColor: '#c6f6d5',
    color: '#22543d',
  },
  storeOwnerBadge: {
    backgroundColor: '#bee3f8',
    color: '#2a69ac',
  },
  rating: {
    fontWeight: 'bold',
    color: '#d69e2e',
  },
};

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({
    name: '',
    email: '',
    address: '',
    role: '',
  });
  const [hoveredRow, setHoveredRow] = useState(null);

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

  const getRoleBadgeStyle = (role) => {
    switch (role) {
      case 'admin':
        return { ...styles.roleBadge, ...styles.adminBadge };
      case 'user':
        return { ...styles.roleBadge, ...styles.userBadge };
      case 'store-owner':
        return { ...styles.roleBadge, ...styles.storeOwnerBadge };
      default:
        return styles.roleBadge;
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>All Users</h2>

      <div style={styles.filtersContainer}>
        <input
          name="name"
          placeholder="Filter by name"
          onChange={handleFilterChange}
          style={styles.input}
          onFocus={(e) => e.target.style.borderColor = '#4299e1'}
          onBlur={(e) => e.target.style.borderColor = '#ddd'}
        />
        <input
          name="email"
          placeholder="Filter by email"
          onChange={handleFilterChange}
          style={styles.input}
          onFocus={(e) => e.target.style.borderColor = '#4299e1'}
          onBlur={(e) => e.target.style.borderColor = '#ddd'}
        />
        <input
          name="address"
          placeholder="Filter by address"
          onChange={handleFilterChange}
          style={styles.input}
          onFocus={(e) => e.target.style.borderColor = '#4299e1'}
          onBlur={(e) => e.target.style.borderColor = '#ddd'}
        />
        <select
          name="role"
          onChange={handleFilterChange}
          style={styles.select}
          onFocus={(e) => e.target.style.borderColor = '#4299e1'}
          onBlur={(e) => e.target.style.borderColor = '#ddd'}
        >
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="user">Normal User</option>
          <option value="store-owner">Store Owner</option>
        </select>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Address</th>
            <th style={styles.th}>Role</th>
            <th style={styles.th}>Rating</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, index) => (
            <tr
              key={u._id}
              style={{
                ...styles.tr,
                backgroundColor: hoveredRow === index ? '#f7fafc' : 'transparent',
              }}
              onMouseEnter={() => setHoveredRow(index)}
              onMouseLeave={() => setHoveredRow(null)}
            >
              <td style={styles.td}>{u.name}</td>
              <td style={styles.td}>{u.email}</td>
              <td style={styles.td}>{u.address}</td>
              <td style={styles.td}>
                <span style={getRoleBadgeStyle(u.role)}>
                  {u.role}
                </span>
              </td>
              <td style={styles.td}>
                {u.role === 'store-owner' ? (
                  <span style={styles.rating}>
                    {u.rating ? `⭐ ${u.rating}` : 'N/A'}
                  </span>
                ) : (
                  '-'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
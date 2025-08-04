import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminAddStore = () => {
  const [form, setForm] = useState({ name: '', email: '', address: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

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
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h2 className="text-2xl font-bold mb-4">Add New Store</h2>
      {message && <p className="mb-2 text-sm text-red-500">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Store Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Store Email (optional)"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <textarea
          name="address"
          placeholder="Store Address"
          value={form.address}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Store
        </button>
      </form>
    </div>
  );
};

export default AdminAddStore;

import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import ChangePassword from './pages/auth/ChangePassword';

import AdminDashboard from './pages/admin/AdminDashboard';
import UsersList from './pages/admin/UsersList';
import StoresList from './pages/admin/StoresList';
import AddUser from './pages/admin/AddUser';
import AddStore from './pages/admin/AddStore'; // ✅ You missed this

import UserDashboard from './pages/user/UserDashboard';
import OwnerDashboard from './pages/owner/OwnerDashboard';

import ProtectedRoute from './routes/ProtectedRoute';

import AdminStoreList from './components/admin/AdminStoreList';
import AdminAddStore from './components/admin/AdminAddStore';




export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/admin/stores" element={<AdminStoreList />} />
      <Route path="/admin/stores/add" element={<AdminAddStore />} />

      {/* 🔐 Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <ProtectedRoute role="admin">
            <UsersList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/stores"
        element={
          <ProtectedRoute role="admin">
            <StoresList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/add-user"
        element={
          <ProtectedRoute role="admin">
            <AddUser />
          </ProtectedRoute>
        }
      />


        <Route
        path="/admin/add-store"
        element={
          <ProtectedRoute role="admin">
            <AddStore />
          </ProtectedRoute>
        }
      />



      {/* 👤 Normal User Route */}
      <Route
        path="/user"
        element={
          <ProtectedRoute role="user">
            <UserDashboard />
          </ProtectedRoute>
        }
      />

      {/* 🏪 Store Owner Route */}
      <Route
        path="/owner"
        element={
          <ProtectedRoute role="owner">
            <OwnerDashboard />
          </ProtectedRoute>
        }
      />

      {/* Common Route */}
      <Route
        path="/change-password"
        element={
          <ProtectedRoute role={null}>
            <ChangePassword />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

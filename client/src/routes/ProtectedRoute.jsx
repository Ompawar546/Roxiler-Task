import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; 
const getUserRole = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const decoded = jwtDecode(token); 
    return decoded.role;
  } catch (err) {
    return null;
  }
};

export default function ProtectedRoute({ children, role }) {
  const userRole = getUserRole();

  if (!userRole) return <Navigate to="/" />;
  if (role && userRole !== role) return <Navigate to="/" />; // ✅ check only if role is provided

  return children;
}

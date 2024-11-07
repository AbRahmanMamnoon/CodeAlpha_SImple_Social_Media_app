// components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    // Redirect to the login page if the user is not authenticated
    return <Navigate to='/login' replace />;
  }

  // Render the children (protected component) if authenticated
  return children;
};

export default ProtectedRoute;

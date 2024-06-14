import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ element: Element, isAdminRoute, ...rest }) => {
  const { auth } = useAuth();

  if (isAdminRoute && !auth.isAdmin) {
    return <Navigate to="/admin-login" />;
  }

  if (!auth.isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return <Element {...rest} />;
};

export default ProtectedRoute;



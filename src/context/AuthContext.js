import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ isLoggedIn: false, isAdmin: false, userId: null });

  const loginAsAdmin = (data) => {
    setAuth({ isLoggedIn: true, isAdmin: true, userId: data.userId });
  };

  const loginAsUser = (data) => {
    setAuth({ isLoggedIn: true, isAdmin: false, userId: data.userId });
  };

  const logout = () => {
    setAuth({ isLoggedIn: false, isAdmin: false, userId: null });
  };

  return (
    <AuthContext.Provider value={{ auth, loginAsAdmin, loginAsUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};









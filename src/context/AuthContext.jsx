import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAdminAuth, setAdminAuth, logoutAdmin as clearAdminAuth } from '../utils/storage';

const AuthContext = createContext(null);

export const DEMO_CREDENTIALS = {
  email: 'admin@collegeclub.com',
  password: 'admin123',
};

export function AuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(() => getAdminAuth());
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Sync state with storage initially
    setIsAdmin(getAdminAuth());
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    // Simulate realistic asynchronous verification delay
    await new Promise((resolve) => setTimeout(resolve, 400));

    const normalizedEmail = (email || '').trim().toLowerCase();
    if (
      normalizedEmail === DEMO_CREDENTIALS.email.toLowerCase() &&
      password === DEMO_CREDENTIALS.password
    ) {
      setAdminAuth(true);
      setIsAdmin(true);
      setIsLoading(false);
      return { success: true };
    } else {
      setIsLoading(false);
      return {
        success: false,
        error: 'Invalid email or password. Use demo credentials.',
      };
    }
  };

  const logout = () => {
    clearAdminAuth();
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

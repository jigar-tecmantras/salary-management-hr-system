import { createContext, useContext, useMemo, useState } from 'react';
import { login as loginApi } from '../api/api';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [token, setToken] = useState('');
  const [profile, setProfile] = useState(null);

  const isAuthenticated = Boolean(token);

  const login = async (username, password) => {
    const result = await loginApi({ username, password });
    setToken(result.token);
    setProfile({ displayName: result.displayName, role: result.role });
    navigate('/');
  };

  const logout = () => {
    setToken('');
    setProfile(null);
    navigate('/login');
  };

  const value = useMemo(
    () => ({ token, profile, isAuthenticated, login, logout }),
    [token, profile, isAuthenticated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('AuthContext must be used within AuthProvider');
  }
  return context;
}

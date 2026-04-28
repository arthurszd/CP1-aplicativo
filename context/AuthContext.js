import React, { createContext, useState, useEffect } from 'react';
import { loginUser as loginService, getSession } from '../services/auth';
import { removeData } from '../services/storage';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadSession = async () => {
      const result = await getSession();
      if (result && result.success && result.session) {
        setUser(result.session);
      }
    };
    loadSession();
  }, []);

  const login = async (email, senha) => {
    const result = await loginService(email, senha);
    if (result.success) {
      setUser(result.user);
    }
    return result;
  };

  const logout = async () => {
    await removeData('@userLogged');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

import React, { createContext, useState, useEffect, useContext } from 'react';
import { loginUser as loginService, registerUser as registerService, getSession } from '../services/auth';
import { removeData } from '../services/storage';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSession = async () => {
      const result = await getSession();
      if (result && result.success && result.session) {
        setUser(result.session);
      }
      setLoading(false);
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

  const register = async (nome, email, senha) => {
    return await registerService(nome, email, senha);
  };

  const logout = async () => {
    await removeData('@userLogged');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

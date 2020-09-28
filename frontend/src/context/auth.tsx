import React, { createContext, useCallback, useContext, useState } from 'react';
import api from '../services/api';

interface AuthState {
  accessToken: string;
  refreshToken: string;
  user: {
    role: 'ADMIN' | 'MANAGER' | 'SELLER';
  };
}

interface SignInCredentials {
  username: string;
  password: string;
}

interface AuthContextData {
  user: {
    role: 'ADMIN' | 'MANAGER' | 'SELLER';
  };
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>((): AuthState => {
    const accessToken = localStorage.getItem('@TotalClean:access-token');
    const refreshToken = localStorage.getItem('@TotalClean:refresh-token');
    const user = localStorage.getItem('@TotalClean:user');

    if (accessToken && refreshToken && user) {
      return { accessToken, refreshToken, user: JSON.parse(user) }
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ username, password }) => {
    const response = await api.post('/auth/login/', { username, password });

    const user = response.data.userByUsername;
    const { accessToken, refreshToken } = response.data;

    localStorage.setItem('@TotalClean:access-token', accessToken);
    localStorage.setItem('@TotalClean:refresh-token', refreshToken);
    localStorage.setItem('@TotalClean:user', JSON.stringify(user));

    setData({ accessToken, refreshToken, user })
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@TotalClean:access-token');
    localStorage.removeItem('@TotalClean:refresh-token');
    localStorage.removeItem('@TotalClean:user');

    setData({} as AuthState);
  }, [])

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.')
  }

  return context;
}

import React, { createContext, useCallback, useContext, useState } from 'react';
import JWT from 'jsonwebtoken';
import api from '../services/api';

interface AuthState {
  accessToken: string;
  refreshToken: string;
  user: {
    role: 'ADMIN' | 'MANAGER' | 'SELLER';
    profile: {
      companyId: number;
    }
  };
  buttons: Button[];
}

interface SignInCredentials {
  username: string;
  password: string;
}

interface AuthContextData {
  user: {
    role: 'ADMIN' | 'MANAGER' | 'SELLER';
    profile: {
      companyId: number;
    }
  };
  buttons: Button[];
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void
}

interface Button {
  name: string;
  enable: boolean;
  route: string;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>((): AuthState => {
    const accessToken = localStorage.getItem('@TotalClean:access-token');
    const refreshToken = localStorage.getItem('@TotalClean:refresh-token');
    const user = localStorage.getItem('@TotalClean:user');

    if (accessToken && refreshToken && user) {
      const decodedAccessToken: any = JWT.decode(String(accessToken), { complete: true });
      let buttons: Button[] = [];

      if (decodedAccessToken.payload.user.role === 'MANAGER') {
        buttons = [
          {
            name: 'Serviços',
            enable: true,
            route: '/services'
          },
          {
            name: 'Registro de vendas',
            enable: true,
            route: '/sales-register'
          },
          {
            name: 'Vendedores',
            enable: true,
            route: '/sellers'
          },
          {
            name: 'Vendas registradas',
            enable: true,
            route: '/sales'
          },
          {
            name: 'Relatórios',
            enable: true,
            route: '/reports'
          },
          {
            name: 'Preços',
            enable: true,
            route: '/prices'
          },
        ]
      }

      if (decodedAccessToken.payload.user.role === 'ADMIN') {
        buttons = [
          {
            name: 'Concessionárias',
            enable: false,
            route: '/companies'
          },
          {
            name: 'Unidades',
            enable: false,
            route: '/unities'
          },
          {
            name: 'Usuários',
            enable: false,
            route: '/users'
          },
          {
            name: 'Serviços',
            enable: false,
            route: '/services'
          },
          {
            name: 'Vendas',
            enable: false,
            route: '/sales'
          },
          {
            name: 'Relatórios',
            enable: false,
            route: '/reports'
          },
        ]
      }

      if (decodedAccessToken.payload.user.role === 'SELLER') {
        buttons = [
          {
            name: 'Serviços',
            enable: false,
            route: '/services'
          },
          {
            name: 'Registro de vendas',
            enable: false,
            route: '/sales-register'
          },
          {
            name: 'Vendas',
            enable: false,
            route: '/sales'
          },
        ]
      }

      return { accessToken, refreshToken, user: JSON.parse(user), buttons }
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ username, password }) => {
    const response = await api.post('/auth/login/', { username, password });

    const user = response.data.userByUsername;
    const { accessToken, refreshToken } = response.data;
    let buttons: Button[] = [];

    if (user.role === 'MANAGER') {
      buttons = [
        {
          name: 'Serviços',
          enable: true,
          route: '/services'
        },
        {
          name: 'Registro de vendas',
          enable: true,
          route: '/sales-register'
        },
        {
          name: 'Vendedores',
          enable: true,
          route: '/sellers'
        },
        {
          name: 'Vendas registradas',
          enable: true,
          route: '/sales'
        },
        {
          name: 'Relatórios',
          enable: true,
          route: '/reports'
        },
        {
          name: 'Preços',
          enable: true,
          route: '/prices'
        },
      ]
    }

    if (user.role === 'ADMIN') {
      buttons = [
        {
          name: 'Concessionárias',
          enable: false,
          route: '/companies'
        },
        {
          name: 'Unidades',
          enable: false,
          route: '/unities'
        },
        {
          name: 'Usuários',
          enable: false,
          route: '/users'
        },
        {
          name: 'Serviços',
          enable: false,
          route: '/services'
        },
        {
          name: 'Vendas',
          enable: false,
          route: '/sales'
        },
        {
          name: 'Relatórios',
          enable: false,
          route: '/reports'
        },
      ]
    }

    if (user.role === 'SELLER') {
      buttons = [
        {
          name: 'Serviços',
          enable: false,
          route: '/services'
        },
        {
          name: 'Registro de vendas',
          enable: false,
          route: '/sales-register'
        },
        {
          name: 'Vendas',
          enable: false,
          route: '/sales'
        },
      ]
    }

    localStorage.setItem('@TotalClean:access-token', accessToken);
    localStorage.setItem('@TotalClean:refresh-token', refreshToken);
    localStorage.setItem('@TotalClean:user', JSON.stringify(user));

    setData({ accessToken, refreshToken, user, buttons })
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@TotalClean:access-token');
    localStorage.removeItem('@TotalClean:refresh-token');
    localStorage.removeItem('@TotalClean:user');

    setData({} as AuthState);
  }, [])

  return (
    <AuthContext.Provider value={{ user: data.user, buttons: data.buttons, signIn, signOut }}>
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

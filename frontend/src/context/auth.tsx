import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { AiOutlineTool } from 'react-icons/ai';
import {
  FiList,
  FiTag,
  FiUsers,
  FiFileText,
  FiDollarSign,
} from 'react-icons/fi';
import { MdBusiness } from 'react-icons/md';
import { useHistory } from 'react-router-dom';

import JWT from 'jsonwebtoken';

import api from '../services/api';

interface IUser {
  role: 'ADMIN' | 'MANAGER' | 'SELLER';
  profile: {
    companyId: number;
    unitId: number;
  };
}

interface IAuthState {
  accessToken: string;
  refreshToken: string;
  user: IUser;
  buttons: IButton[];
}

interface ISignInCredentials {
  username: string;
  password: string;
}

interface IAuthContextData {
  user: {
    role: 'ADMIN' | 'MANAGER' | 'SELLER';
    profile: {
      companyId: number;
      unitId: number;
    };
  };
  buttons: IButton[];
  signIn(credentials: ISignInCredentials): Promise<void>;
  signOut(): void;
}

interface IButton {
  name: string;
  enable: boolean;
  route: string;
  icon?: JSX.Element;
}

export const AuthContext = createContext<IAuthContextData>(
  {} as IAuthContextData,
);

export const AuthProvider: React.FC = ({ children }) => {
  const history = useHistory();

  const [data, setData] = useState<IAuthState>(
    (): IAuthState => {
      const accessToken = localStorage.getItem('@TotalClean:access-token');
      const refreshToken = localStorage.getItem('@TotalClean:refresh-token');
      const user = localStorage.getItem('@TotalClean:user');

      if (accessToken && refreshToken && user) {
        const decodedAccessToken: any = JWT.decode(String(accessToken), {
          complete: true,
        });
        let buttons: IButton[] = [];

        if (decodedAccessToken.payload.user.role === 'MANAGER') {
          buttons = [
            {
              name: 'Serviços',
              enable: true,
              route: '/services',
              icon: <AiOutlineTool color="#fff" />,
            },
            {
              name: 'Registro de vendas',
              enable: true,
              route: '/sales-register',
              icon: <FiDollarSign color="#fff" />,
            },
            {
              name: 'Vendedores',
              enable: true,
              route: '/sellers',
              icon: <FiUsers color="#fff" />,
            },
            {
              name: 'Vendas registradas',
              enable: true,
              route: '/sales',
              icon: <FiList color="#fff" />,
            },
            {
              name: 'Relatórios',
              enable: true,
              route: '/reports',
              icon: <FiFileText color="#fff" />,
            },
            {
              name: 'Preços',
              enable: true,
              route: '/prices',
              icon: <FiTag color="#fff" />,
            },
          ];
        }

        if (decodedAccessToken.payload.user.role === 'ADMIN') {
          buttons = [
            {
              name: 'Concessionárias',
              enable: false,
              route: '/companies',
              icon: <MdBusiness color="#fff" />,
            },
            {
              name: 'Usuários',
              enable: false,
              route: '/users',
              icon: <FiUsers color="#fff" />,
            },
            {
              name: 'Serviços',
              enable: false,
              route: '/services',
              icon: <AiOutlineTool color="#fff" />,
            },
            {
              name: 'Administrar Serviços',
              enable: false,
              route: '/administration-services',
              icon: <FiTag color="#fff" />,
            },
            {
              name: 'Vendas',
              enable: false,
              route: '/sales',
              icon: <FiList color="#fff" />,
            },
            {
              name: 'Relatórios',
              enable: false,
              route: '/reports',
              icon: <FiFileText color="#fff" />,
            },
          ];
        }

        if (decodedAccessToken.payload.user.role === 'SELLER') {
          buttons = [
            {
              name: 'Serviços',
              enable: false,
              route: '/services',
              icon: <AiOutlineTool color="#fff" />,
            },
            {
              name: 'Registro de vendas',
              enable: false,
              route: '/sales-register',
              icon: <FiDollarSign color="#fff" />,
            },
            {
              name: 'Vendas',
              enable: false,
              route: '/sales',
              icon: <FiList color="#fff" />,
            },
          ];
        }

        return { accessToken, refreshToken, user: JSON.parse(user), buttons };
      }

      return {} as IAuthState;
    },
  );

  const isLoggedIn = useCallback(() => !!data?.accessToken, [data]);

  useEffect(() => {
    const route = history.location.pathname;

    const isRoute = (name: string) => route.split('?')[0] === name;

    if (!isLoggedIn()) {
      if (!isRoute('/')) {
        history.replace('/');
      }
      return;
    }

    if (isRoute('/') || isRoute('/login') || isRoute('/app')) {
      history.replace('/services');
      return;
    }

    api.get('profile').then(response => {
      const user = response.data;

      let buttons;

      if (user.role === 'MANAGER') {
        buttons = [
          {
            name: 'Serviços',
            enable: true,
            route: '/services',
            icon: <AiOutlineTool color="#fff" />,
          },
          {
            name: 'Registro de vendas',
            enable: true,
            route: '/sales-register',
            icon: <FiDollarSign color="#fff" />,
          },
          {
            name: 'Vendedores',
            enable: true,
            route: '/sellers',
            icon: <FiUsers color="#fff" />,
          },
          {
            name: 'Vendas registradas',
            enable: true,
            route: '/sales',
            icon: <FiList color="#fff" />,
          },
          {
            name: 'Relatórios',
            enable: true,
            route: '/reports',
            icon: <FiFileText color="#fff" />,
          },
          {
            name: 'Preços',
            enable: true,
            route: '/prices',
            icon: <FiTag color="#fff" />,
          },
        ];
      }

      if (user.role === 'ADMIN') {
        buttons = [
          {
            name: 'Concessionárias',
            enable: false,
            route: '/companies',
            icon: <MdBusiness color="#fff" />,
          },
          {
            name: 'Usuários',
            enable: false,
            route: '/users',
            icon: <FiUsers color="#fff" />,
          },
          {
            name: 'Serviços',
            enable: false,
            route: '/services',
            icon: <AiOutlineTool color="#fff" />,
          },
          {
            name: 'Administrar Serviços',
            enable: false,
            route: '/administration-services',
            icon: <FiTag color="#fff" />,
          },
          {
            name: 'Vendas',
            enable: false,
            route: '/sales',
            icon: <FiList color="#fff" />,
          },
          {
            name: 'Relatórios',
            enable: false,
            route: '/reports',
            icon: <FiFileText color="#fff" />,
          },
        ];
      }

      if (user.role === 'SELLER') {
        buttons = [
          {
            name: 'Serviços',
            enable: false,
            route: '/services',
            icon: <AiOutlineTool color="#fff" />,
          },
          {
            name: 'Registro de vendas',
            enable: false,
            route: '/sales-register',
            icon: <FiDollarSign color="#fff" />,
          },
          {
            name: 'Vendas',
            enable: false,
            route: '/sales',
            icon: <FiList color="#fff" />,
          },
        ];
      }

      if (!buttons) {
        return;
      }

      setData({
        ...data,
        user: response.data,
        buttons,
      });
    });
  }, [history, isLoggedIn, data]);

  const signIn = useCallback(async ({ username, password }) => {
    const response = await api.post('/auth/login/', { username, password });

    const user = response.data.userByUsername;
    const { accessToken, refreshToken } = response.data;
    let buttons: IButton[] = [];

    if (user.role === 'MANAGER') {
      buttons = [
        {
          name: 'Serviços',
          enable: true,
          route: '/services',
          icon: <AiOutlineTool color="#fff" />,
        },
        {
          name: 'Registro de vendas',
          enable: true,
          route: '/sales-register',
          icon: <FiDollarSign color="#fff" />,
        },
        {
          name: 'Vendedores',
          enable: true,
          route: '/sellers',
          icon: <FiUsers colorRendering="#fff" color="#fff" />,
        },
        {
          name: 'Vendas registradas',
          enable: true,
          route: '/sales',
          icon: <FiList color="#fff" />,
        },
        {
          name: 'Relatórios',
          enable: true,
          route: '/reports',
          icon: <FiFileText color="#fff" />,
        },
        {
          name: 'Preços',
          enable: true,
          route: '/prices',
          icon: <FiTag color="#fff" />,
        },
      ];
    }

    if (user.role === 'ADMIN') {
      buttons = [
        {
          name: 'Concessionárias',
          enable: false,
          route: '/companies',
          icon: <MdBusiness color="#fff" />,
        },
        {
          name: 'Usuários',
          enable: false,
          route: '/users',
          icon: <FiUsers color="#fff" />,
        },
        {
          name: 'Serviços',
          enable: false,
          route: '/services',
          icon: <AiOutlineTool color="#fff" />,
        },
        {
          name: 'Administrar Serviços',
          enable: false,
          route: '/administration-services',
          icon: <FiTag color="#fff" />,
        },
        {
          name: 'Vendas',
          enable: false,
          route: '/sales',
          icon: <FiList color="#fff" />,
        },
        {
          name: 'Relatórios',
          enable: false,
          route: '/reports',
          icon: <FiFileText color="#fff" />,
        },
      ];
    }

    if (user.role === 'SELLER') {
      buttons = [
        {
          name: 'Serviços',
          enable: false,
          route: '/services',
          icon: <AiOutlineTool color="#fff" />,
        },
        {
          name: 'Registro de vendas',
          enable: false,
          route: '/sales-register',
          icon: <FiDollarSign color="#fff" />,
        },
        {
          name: 'Vendas',
          enable: false,
          route: '/sales',
          icon: <FiList color="#fff" />,
        },
      ];
    }

    localStorage.setItem('@TotalClean:access-token', accessToken);
    localStorage.setItem('@TotalClean:refresh-token', refreshToken);
    localStorage.setItem('@TotalClean:user', JSON.stringify(user));

    setData({ accessToken, refreshToken, user, buttons });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@TotalClean:access-token');
    localStorage.removeItem('@TotalClean:refresh-token');
    localStorage.removeItem('@TotalClean:user');

    setData({} as IAuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: data.user, buttons: data.buttons, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): IAuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.');
  }

  return context;
}

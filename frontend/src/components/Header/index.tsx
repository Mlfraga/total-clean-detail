import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Container from './styles';
import { useAuth } from '../../context/auth';

import logo from '../../assets/Icon.svg'

interface Button {
  name: string;
  enable: boolean;
  route: string;
}

const Header: React.FC = () => {
  const history = useHistory();
  // const initialSelectedButton = history.location.pathname.replace('/', '');
  const [selected, setSelected] = useState('');
  const { user } = useAuth();
  const [buttons, setButtons] = useState<Button[]>([])

  useEffect(() => {
    if (user.role === 'MANAGER') {
      setButtons([{
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
      },])
    }

    if (user.role === 'ADMIN') {
      setButtons([
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
      ])
    }

    if (user.role === 'SELLER') {
      setButtons([
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
      ])
    }

  }, [user.role])

  return (
    <Container>
      <div className="header">
        <div className="logo">
          <h1 >Total Clean</h1>
          <img src={logo} alt="TotalClean"></img>
        </div>
        <div className="buttonsContainer">
          <div className="buttons">
            {buttons.map(button => (
              <Link
                key={button.route}
                className={selected === button.route ? 'header-button-selected' : 'header-button'}
                to={`/${button.route}`}
                onClick={() => setSelected(button.route)}>
                {button.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Header;

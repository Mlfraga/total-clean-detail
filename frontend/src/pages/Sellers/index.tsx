import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Breadcrumb from '../../components/Breadcrumb';
import Button from '../../components/Button';
import Menu from '../../components/Menu';
import api from '../../services/api';
import { Container, Content, Separator, List } from './styles';

interface IFormatRow {
  id: number;
  name: string;
  telephone: string;
  enabled: boolean;
  user: {
    email: string;
    role: 'MANAGER' | 'SELLER';
  };
  company: {
    name: string;
  };
  unit: {
    name: string;
  };
}

const Sellers = () => {
  const [rows, setRows] = useState<IFormatRow[]>([]);

  const history = useHistory();

  useEffect(() => {
    api.get('users/company').then(response => {
      const sellers: IFormatRow[] = response.data;

      setRows(sellers);
    });
  }, []);

  return (
    <Container>
      <Menu />

      <Breadcrumb text="Vendedores" />
      <Content
        marginLeft="auto"
        marginRight="auto"
        width="100%"
        maxWidth={{
          xs: '90vw',
          sm: '90vw',
          md: '80vw',
          lg: '78vw',
          xl: '90vw',
        }}
      >
        <Separator>
          <span>Vendedores</span>
          <div />
        </Separator>
        <div className="boxTitle">
          <h3>Nome</h3>
          <h3>Telefone</h3>
          <h3>E-mail</h3>
          <h3>Concessionária</h3>
          <h3>Unidade</h3>
          <h3>Cargo</h3>
        </div>

        <List>
          {rows.map(row => (
            <div className="box">
              <span>{row.name}</span>
              <span>{row.telephone}</span>
              <span>{row.user.email}</span>
              <span>{row.company.name}</span>
              <span>{row.unit?.name}</span>
              <span>
                {row.user?.role === 'MANAGER' ? 'Gerente' : 'Vendedor'}
              </span>
            </div>
          ))}
        </List>
        <div className="button">
          <Button
            onClick={() => {
              history.push('sellers-register');
            }}
          >
            Registrar novo vendedor
          </Button>
        </div>
      </Content>
    </Container>
  );
};

export default Sellers;

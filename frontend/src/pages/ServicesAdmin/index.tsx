import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Container, Content, Separator, List } from './styles';

import Header from '../../components/Header';
import Breadcrumb from '../../components/Breadcrumb';
import Button from '../../components/Button';

import api from '../../services/api';

interface FormatRow {
  id: number
  name: string;
  price: number;
  enabled: boolean;
}

const AdminServices = () => {
  const [rows, setRows] = useState<FormatRow[]>([]);

  const history = useHistory();

  useEffect(()=>{
    api.get('services').then(response => {
      const services: FormatRow[] = response.data;

      setRows(services);
    });
  },[])

  return (
    <Container>
      <Header />

      <Breadcrumb text='Serviços' />
      <Content>
        <Separator>
          <span>Serviços</span>
          <div />
        </Separator >
          <div className="boxTitle">
            <h3>Nome</h3>
            <h3>Preço</h3>
            <h3>Situação</h3>
          </div>

        <List>
          {rows.map(row => (
            <div className="box">
            <span>{row.name}</span>
            <span>{row.price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</span>
            <span>
              <div className={!row.enabled ? 'unabled' : 'enabled'}/>
              {!row.enabled ? 'Inativo' : 'Ativo'}
            </span>
          </div>
          ))}

        </List>
        <div className="button">
          <Button onClick={()=>{history.push('sellers-register')}}>Registrar novo serviço</Button>
        </div>
      </Content>

    </Container >
  );
}

export default AdminServices;

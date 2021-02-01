import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import { Button as CharaButton, Tooltip } from '@chakra-ui/core';

import Breadcrumb from '../../components/Breadcrumb';
import Button from '../../components/Button';
import Menu from '../../components/Menu';
import UpdateServicePrice from '../../components/Modals/UpdateServicePrice';
import api from '../../services/api';
import { Container, Content, Separator, List } from './styles';

interface IFormatRow {
  id: number;
  name: string;
  price: number;
  enabled: boolean;
}

const AdminServices = () => {
  const [rows, setRows] = useState<IFormatRow[]>([]);

  const [openUpdateService, setOpenUpdateService] = useState<number>();

  const history = useHistory();
  useEffect(() => {
    api.get('services').then(response => {
      const services: IFormatRow[] = response.data;

      setRows(services);
    });
  }, []);

  const getService = useCallback(() => {
    api.get('services').then(response => {
      const services: IFormatRow[] = response.data;

      setRows(services);
    });
  }, []);

  const handleOpenUpdateServiceModal = useCallback((id: number) => {
    setOpenUpdateService(id);
  }, []);

  const handleCloseUpdateServiceModal = useCallback(async () => {
    setOpenUpdateService(undefined);
  }, []);

  const rowsFormatted = useMemo(
    () =>
      rows.map(row => ({
        id: row.id,
        name: row.name,
        price: row.price.toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL',
        }),
        enabled: row.enabled,
        button: (
          <Tooltip aria-label="Alterar preço" label="Alterar preço">
            <CharaButton
              onClick={() => handleOpenUpdateServiceModal(row.id)}
              _hover={{ background: '#353535', border: 0 }}
              _focusWithin={{ border: 0 }}
              background="#282828"
            >
              <FiEdit />
            </CharaButton>
          </Tooltip>
        ),
      })),
    [rows, handleOpenUpdateServiceModal],
  );

  return (
    <Container>
      <Menu />

      <Breadcrumb text="Serviços" />
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
          <span>Serviços</span>
          <div />
        </Separator>
        <div className="boxTitle">
          <h3>Nome</h3>
          <h3>Preço</h3>
          <h3>Situação</h3>
        </div>

        <List>
          {rowsFormatted.map(row => (
            <div className="box">
              <span>{row.name}</span>
              <span>{row.price}</span>
              <span>
                <div className={!row.enabled ? 'unabled' : 'enabled'} />
                {!row.enabled ? 'Inativo' : 'Ativo'}
              </span>
              {row.button}
            </div>
          ))}
        </List>
        <div className="button">
          <Button
            onClick={() => {
              history.push('services-register');
            }}
          >
            Registrar novo serviço
          </Button>
        </div>

        <UpdateServicePrice
          isOpen={!!openUpdateService}
          onClose={handleCloseUpdateServiceModal}
          onSave={getService}
          id={openUpdateService}
        />
      </Content>
    </Container>
  );
};

export default AdminServices;

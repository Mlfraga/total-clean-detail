import React, { useRef, useCallback, useEffect, useState } from 'react';
import { FiDollarSign } from 'react-icons/fi';
import { MdModeEdit } from 'react-icons/md';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import Breadcrumb from '../../components/Breadcrumb';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Input from '../../components/Input';
import { useToast } from '../../context/toast';
import api from '../../services/api';
import { currencyMasker } from '../../utils/masks';
import { Container, Content, Separator, List, Box } from './styles';

interface ICompanyService {
  id: number;
  price: number;
  service: {
    id: number;
    price: number;
    name: string;
  };
}

const UpdateCompanyPrices = () => {
  const { addToast } = useToast();
  const formRef = useRef<FormHandles>(null);

  const [companyServices, setCompanyServices] = useState<ICompanyService[]>([]);
  const [editionMode, setEditionMode] = useState<boolean>(false);
  const [
    companyServiceSelected,
    setCompanyServiceSelected,
  ] = useState<ICompanyService>({} as ICompanyService);

  const loadCompanyServices = useCallback(() => {
    api.get('companyservices/company').then(response => {
      const { data } = response;

      const services: ICompanyService[] = data.map(
        (companyService: ICompanyService) => {
          const { id, price, service } = companyService;

          return {
            id,
            price,
            service,
          };
        },
      );

      setCompanyServices(services);
    });
  }, []);

  useEffect(() => {
    loadCompanyServices();
  }, [loadCompanyServices]);

  const handleEditClick = useCallback((companyService: ICompanyService) => {
    setCompanyServiceSelected(companyService);

    setEditionMode(true);
  }, []);

  const handleKeyUp = useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      event.preventDefault();
      currencyMasker(event);
    },
    [],
  );

  const handleCancelEdition = useCallback(() => {
    setEditionMode(false);
    setCompanyServiceSelected({} as ICompanyService);
  }, []);

  const handleSubmit = useCallback(
    async data => {
      try {
        if (!Number(data.newValue)) {
          formRef.current?.setErrors({
            newValue: 'O novo valor deve ser informado.',
          });
          return;
        }

        const dataToSubmit = {
          companyServiceId: companyServiceSelected?.id,
          price: Number(data.newValue),
        };

        const response = await api.put('companyservices/updateprice', [
          dataToSubmit,
        ]);

        if (response.status === 200) {
          addToast({
            title: 'Sucesso',
            type: 'success',
            description: 'Valor alterado com sucesso.',
          });
          setEditionMode(false);
          loadCompanyServices();
        }
      } catch (err) {
        addToast({
          title: 'Erro.',
          type: 'error',
          description: 'Ocorreu um erro ao alterar o valor, tente novamente.',
        });
      }
    },
    [addToast, companyServiceSelected, loadCompanyServices],
  );

  return (
    <Container>
      <Header />
      <Breadcrumb text="Preços dos serviços" />
      <Content>
        <Separator>
          <span>Preços</span>
          <div />
        </Separator>
        <div className="boxTitle">
          <span>Serviço</span>
          <span>Valor da total clean</span>
          <span>Valor a ser cobrado</span>
        </div>
        <List>
          {companyServices?.map(companyService => (
            <Box key={companyService.id}>
              <span>{companyService.service.name}</span>
              <span>
                {companyService.service.price.toLocaleString('pt-br', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </span>
              <span>
                {companyService.price.toLocaleString('pt-br', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </span>
              <span></span>
              <MdModeEdit
                size={20}
                onClick={() => {
                  handleEditClick(companyService);
                }}
              />
            </Box>
          ))}
        </List>
      </Content>

      {editionMode === true && (
        <div className="edition-mode-container">
          <section>
            <div className="header">
              <h1>Altere o valor do serviço</h1>
              <span className="service-name">
                {companyServiceSelected?.service.name}
              </span>

              <div className="company-service-data-header">
                <span>Valor a ser alterado</span>
                <span>Valor da Total Clean</span>
              </div>

              <div className="company-service-data">
                <span>
                  {companyServiceSelected?.price.toLocaleString('pt-br', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </span>
                <span>
                  {companyServiceSelected?.service.price.toLocaleString(
                    'pt-br',
                    { style: 'currency', currency: 'BRL' },
                  )}
                </span>
              </div>
            </div>
            <Form ref={formRef} onSubmit={handleSubmit}>
              <div className="input">
                <p>Novo valor:</p>
                <Input
                  onKeyUp={handleKeyUp}
                  name="newValue"
                  icon={FiDollarSign}
                />
              </div>

              <div className="buttons">
                <Button skipButton onClick={handleCancelEdition}>
                  Cancelar
                </Button>
                <Button type="submit">Salvar</Button>
              </div>
            </Form>
          </section>
        </div>
      )}
    </Container>
  );
};

export default UpdateCompanyPrices;

import React, { useRef, useCallback, useEffect, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import { useToast } from '../../context/toast';
import api from '../../services/api';

import { Container, Content, Separator, List, Box } from './styles';
import { MdModeEdit } from 'react-icons/md'
import { FiDollarSign } from 'react-icons/fi';

import { currencyMasker } from '../../utils/masks'

import Header from '../../components/Header';
import Breadcrumb from '../../components/Breadcrumb';
import Input from '../../components/Input';
import Button from '../../components/Button';

interface CompanyService {
  id: number;
  price: number;
  service: {
    id: number;
    price: number;
    name: string;
  }
}

const UpdateCompanyPrices = () => {
  const { addToast } = useToast();
  const formRef = useRef<FormHandles>(null);

  const [companyServices, setCompanyServices] = useState<CompanyService[]>([])
  const [editionMode, setEditionMode] = useState<boolean>(false)
  const [companyServiceSelected, setCompanyServiceSelected] = useState<CompanyService>({} as CompanyService)

  useEffect(() => {
    loadCompanyServices();
  }, []);

  const loadCompanyServices = useCallback(() => {
    api.get('companyservices/company').then(response => {
      const data: CompanyService[] = response.data;

      const services: CompanyService[] = data.map(companyService => {
        const { id, price, service } = companyService;

        return {
          id,
          price,
          service
        }
      })

      setCompanyServices(services);
    })
  }, [])

  const handleEditClick = useCallback((companyService: CompanyService) => {
    setCompanyServiceSelected(companyService);

    setEditionMode(true);
  }, [])

  const handleKeyUp = useCallback((event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    currencyMasker(event);
  }, [])

  const handleCancelEdition = useCallback(() => {
    setEditionMode(false);
    setCompanyServiceSelected({} as CompanyService);
  }, []);

  const handleSubmit = useCallback(async (data) => {
    try {

      if (!Number(data.newValue)) {
        formRef.current?.setErrors({ newValue: 'O novo valor deve ser informado.' });
        return;
      }

      const dataToSubmit = {
        companyServiceId: companyServiceSelected?.id,
        price: Number(data.newValue),
      }

      const response = await api.put('companyservices/updateprice', [dataToSubmit]);

      if (response.status === 200) {
        addToast({ title: 'Sucesso', type: 'success', description: 'Valor alterado com sucesso.' });
        setEditionMode(false);
        loadCompanyServices();
      }
    } catch (err) {
      addToast({ title: 'Erro.', type: 'error', description: 'Ocorreu um erro ao alterar o valor, tente novamente.' });
    }
  }, [addToast, companyServiceSelected])

  return (
    <Container>
      <Header />
      <Breadcrumb text="Preços dos serviços" />
      <Content>
        <Separator>
          <span>Preços</span>
          <div />
        </Separator >
        <div className="boxTitle">
          <span>Serviço</span>
          <span>Valor da total clean</span>
          <span>Valor a ser cobrado</span>
        </div>
        <List>
          {companyServices?.map(companyService => (
            <Box key={companyService.id}>
              <span>{companyService.service.name}</span>
              <span>{companyService.service.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span>
              <span>{companyService.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span>
              <span></span>
              <MdModeEdit size={20} onClick={() => { handleEditClick(companyService) }} />
            </Box>
          ))}
        </List>
      </Content>

      { editionMode === true &&
        <div className="edition-mode-container" >
          <section>
            <div className="header">
              <h1>Altere o valor do serviço</h1>
              <span className="service-name">{companyServiceSelected?.service.name}</span>

              <div className="company-service-data-header">
                <span>Valor a ser alterado</span>
                <span>Valor da Total Clean</span>
              </div>

              <div className="company-service-data">
                <span>{companyServiceSelected?.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span>
                <span>{companyServiceSelected?.service.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span>
              </div>
            </div>
            <Form ref={formRef} onSubmit={(handleSubmit)}>
              <div className="input">
                <label >Novo valor:</label>
                <Input
                  onKeyUp={handleKeyUp}
                  name="newValue"
                  icon={FiDollarSign}
                />
              </div>

              <div className="buttons">
                <Button skipButton={true} onClick={handleCancelEdition}>Cancelar</Button>
                <Button type='submit'>Salvar</Button>
              </div>
            </Form>
          </section>
        </div>
      }
    </Container >
  );
}

export default UpdateCompanyPrices;

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { FiDollarSign } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import { Grid } from '@chakra-ui/core';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import Breadcrumb from '../../components/Breadcrumb';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Input from '../../components/Input';
import { useAuth } from '../../context/auth';
import { useToast } from '../../context/toast';
import api from '../../services/api';
import { currencyMasker } from '../../utils/masks';
import { Container, Content, Buttons, PriceBox } from './styles';

interface IServices {
  id: number;
  name: string;
  price: number;
  enabled: boolean;
}

const SetCompanyPrices = () => {
  const { user } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);

  const [services, setServices] = useState<IServices[]>([]);

  useEffect(() => {
    api.get('services').then(response => {
      const newServices: IServices[] = response.data;

      setServices(newServices);
    });

    api.get('companyservices/company').then(response => {
      const companyservices = response.data;

      if (companyservices.length > 0) {
        history.push('services');
      }
    });
  }, [history]);

  const handleKeyUp = useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      event.preventDefault();
      currencyMasker(event);
    },
    [],
  );

  const handleSubmit = useCallback(
    async (data: any) => {
      try {
        const ids = Object.keys(data);

        const newServices = ids.map(id => ({
          serviceId: Number(id),
          price: parseFloat(data[id]),
        }));

        // eslint-disable-next-line no-restricted-globals
        const voidValues = newServices.filter(value => isNaN(value.price));

        const voidInputsClassesNames = voidValues.map(value => value.serviceId);

        if (voidInputsClassesNames.length > 0) {
          addToast({
            title: `${voidInputsClassesNames.length} campos vazios`,
            type: 'error',
            description: 'Por favor preencha todos os campos.',
          });

          return;
        }

        const response = await api.post('companyservices', {
          companyId: user?.profile.companyId,
          services: newServices,
        });

        if (response.status === 200) {
          addToast({
            title: 'Sucesso',
            type: 'success',
            description: 'Agora a sua concessionária ja pode registrar vendas.',
          });
          history.push('services');
        }
      } catch (err) {
        addToast({
          title: 'Não foi possivel salvar.',
          type: 'error',
          description: 'Ocorreu um erro, tente novamente.',
        });
      }
    },
    [addToast, history, user],
  );

  return (
    <Container>
      <Header></Header>
      <Breadcrumb text="Configure o preço de cada serviço em seu estabelecimento." />
      <Content
        marginLeft="auto"
        marginRight="auto"
        width="100%"
        maxWidth={{
          xs: '90vw',
          sm: '90vw',
          md: '90vw',
          lg: '72vw',
          xl: '62vw',
        }}
      >
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Grid
            width="100%"
            marginTop={4}
            maxWidth={{
              xs: '90vw',
              sm: '90vw',
              md: '90vw',
              lg: '72vw',
              xl: '62vw',
            }}
            gridTemplateColumns="23% 23% 23% 23%"
            justifyContent="space-between"
          >
            {services.map(service => (
              <PriceBox key={service.id}>
                <div className="title-container">
                  <span id="service-name">{service.name.toUpperCase()}</span>
                </div>
                <br />
                <span id="price-totalclean">
                  Preço da Total Clean:{' '}
                  {service.price.toLocaleString('pt-br', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </span>
                <br />
                <div className="inputs">
                  <Input
                    className="input"
                    id={service.id.toString()}
                    name={service.id.toString()}
                    placeholder="Preço"
                    onKeyUp={handleKeyUp}
                    style={{ width: '30px' }}
                    icon={FiDollarSign}
                  />
                </div>
              </PriceBox>
            ))}
          </Grid>
          <Buttons>
            <Button type="submit">Salvar</Button>
            <Button skipButton>Pular</Button>
          </Buttons>
        </Form>
      </Content>
    </Container>
  );
};

export default SetCompanyPrices;

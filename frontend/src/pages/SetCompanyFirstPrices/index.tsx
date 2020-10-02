import React, { useEffect, useState, useRef, useCallback } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web'
import { useHistory } from 'react-router-dom';
import { FiDollarSign } from 'react-icons/fi';

import Header from '../../components/Header';
import Breadcrumb from '../../components/Breadcrumb';
import Button from '../../components/Button';
import Input from '../../components/Input';

import { useAuth } from '../../context/auth';
import { useToast } from '../../context/toast';

import api from '../../services/api';
import { currencyMasker } from './masks'

import { Container, Content, Buttons, ListBoxes, PriceBox } from './styles';

interface NewServices {
  serviceId: number;
  price: any;
}

interface Services {
  id: number;
  name: string;
  price: Number;
  enabled: Boolean;
}

const SetCompanyPrices = () => {
  const { user } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);

  const [services, setServices] = useState<Services[]>([]);

  useEffect(() => {
    api.get('services').then(response => {
      const services: Services[] = response.data;

      setServices(services);
    })

    api.get('companyservices/company').then(response => {
      const companyservices = response.data;

      if (companyservices.length > 0) {
        history.push('services')
        return;
      }
    })

  }, [history])

  const handleKeyUp = useCallback((event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    currencyMasker(event);
  }, [])

  const handleSubmit = useCallback(async (data: any) => {
    try {
      const ids = Object.keys(data);

      const newServices = ids.map(id => (
        {
          serviceId: parseInt(id),
          price: parseFloat(data[id])
        }
      ))

      const voidValues = newServices.filter(value => isNaN(value.price))

      const voidInputsClassesNames = voidValues.map(value => value.serviceId)

      if (voidInputsClassesNames.length > 0) {
        addToast({ title: `${voidInputsClassesNames.length} campos vazios`, type: 'error', description: 'Por favor preencha todos os campos.' })

        return;
      }

      const response = await api.post('companyservices', { companyId: user.profile.companyId, services: newServices });

      if (response.status === 200) {
        addToast({ title: 'Sucesso', type: 'success', description: 'Agora a sua concessionária ja pode registrar vendas.' });
        history.push('services');
      }
    } catch (err) {
      addToast({ title: 'Não foi possivel salvar.', type: 'error', description: 'Ocorreu um erro, tente novamente.' })
    }
  }, [addToast, history, user.profile.companyId]);

  return (
    <Container>
      <Header ></Header>
      <Breadcrumb text='Configure o preço de cada serviço em seu estabelecimento.' />
      <Content>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <ListBoxes>
            {services.map(service => (
              <PriceBox key={service.id}>
                <div className='title-container'>
                  <span id='service-name'>{service.name.toUpperCase()}</span>
                </div>
                <br />

                <span id='price-totalclean'>Preço da Total Clean: R$: {service.price}</span>

                <br />

                <div className='inputs' >
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
          </ListBoxes>
          <Buttons >
            <Button type="submit">Salvar</Button>
            <Button skipButton={true} >Pular</Button>
          </Buttons>
        </Form>
      </Content>
    </Container >
  );
}

export default SetCompanyPrices;

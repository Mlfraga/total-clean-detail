import React, { useRef, useCallback, useEffect, useState } from 'react';
import { FiCheckCircle } from 'react-icons/fi';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import Breadcrumb from '../../components/Breadcrumb';
import Button from '../../components/Button';
import Datetime from '../../components/Datetime';
import Input from '../../components/Input';
import Menu from '../../components/Menu';
import Select from '../../components/Select';
import Textarea from '../../components/Textarea';
import { useAuth } from '../../context/auth';
import { useToast } from '../../context/toast';
import api from '../../services/api';
import getValidationsErrors from '../../utils/getValidationError';
import {
  Container,
  Content,
  Inputs,
  Separator,
  InputContainer,
  Services,
  ServiceBox,
  RegisterSuccessPage,
} from './styles';

interface IServices {
  id: number;
  name: string;
  price: number;
  enabled: boolean;
}

interface IFormData {
  car: string;
  carColor: string;
  carModel: string;
  carPlate: string;
  cpf: string;
  sourceCar: string;
  availabilityDate: string;
  deliveryDate: string;
  name: string;
  comments?: string;
}

const SalesRegister = () => {
  const { user } = useAuth();
  const { addToast } = useToast();

  const formRef = useRef<FormHandles>(null);

  const [successPage, setSuccessPage] = useState<{
    isAvailable: boolean;
    saleId?: number;
  } | null>(null);

  const [services, setServices] = useState<IServices[]>([]);
  const [selectedServices, setSelectedServices] = useState<number[]>([]);

  const selectOptions: Array<{ value: string; label: string }> = [
    { value: 'NEW', label: '0 KM' },
    { value: 'USED', label: 'Semi-novo' },
    { value: 'WORKSHOP', label: 'Oficina' },
  ];

  useEffect(() => {
    api.get('services').then(response => {
      const responseServices: IServices[] = response.data;

      setServices(responseServices);
    });
  }, []);

  const handleSelectService = useCallback(
    (id: number) => {
      const alreadySelected = selectedServices.findIndex(item => item === id);

      if (alreadySelected >= 0) {
        const filteredItems = selectedServices.filter(item => item !== id);

        setSelectedServices(filteredItems);
      } else {
        setSelectedServices([...selectedServices, id]);
      }
    },
    [selectedServices],
  );

  const handleSubmit = useCallback(
    async (data: IFormData, { reset }) => {
      const responseCompanyBudget = await api.post(
        '/sale/getcompanysalebudget',
        { companyId: user?.profile.companyId, services: selectedServices },
      );

      const { companyPrice } = responseCompanyBudget.data;

      const responseCostBudget = await api.post('/sale/getsalebudget', {
        services: selectedServices,
      });

      const { costPrice } = responseCostBudget.data;

      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          car: Yup.string().required('Carro obrigatório'),
          carColor: Yup.string().required('Cor do carro obrigatório'),
          carModel: Yup.string().required('Modelo do carro obrigatório'),
          carPlate: Yup.string()
            .required('Placa do carro obrigatório')
            .min(7, 'Mínimo de 7 caracteres')
            .max(8, 'Máximo de 8 caracteres'),
          cpf: Yup.string()
            .required('Cpf obrigatório')
            .max(11, 'No máximo 11 dígitos'),
          name: Yup.string().required('Nome obrigatório'),
          sourceCar: Yup.string().required('Origem do carro obrigatório'),
          deliveryDate: Yup.string().required('Data de entrega obrigatória'),
          comments: Yup.string(),
          availabilityDate: Yup.string().required(
            'Data de disponibilidade obrigatória',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        if (selectedServices.length <= 0) {
          addToast({ title: 'Nenhum serviço selecionado.', type: 'error' });
          throw new Error('Services are required.');
        }

        const createSaleData = {
          deliveryDate: data.deliveryDate,
          availabilityDate: data.availabilityDate,
          companyPrice,
          costPrice,
          source: data.sourceCar,
          name: data.name,
          cpf: data.cpf,
          comments: data.comments,
          car: data.car,
          carModel: data.carModel,
          carPlate: data.carPlate,
          carColor: data.carColor,
        };

        const responseCreatedSale = await api.post('sale', createSaleData);

        if (responseCreatedSale.status === 200) {
          const createServiceSaleData = {
            saleId: responseCreatedSale.data.id,
            serviceIds: selectedServices,
          };

          const responseCreatedServiceSale = await api.post(
            'servicesale',
            createServiceSaleData,
          );

          if (responseCreatedServiceSale.status === 200) {
            addToast({
              title: 'Sucesso',
              type: 'success',
              description: `Pedido n° ${responseCreatedSale.data.id} registrado com sucesso.`,
            });
            setSuccessPage({
              isAvailable: true,
              saleId: responseCreatedSale.data.id,
            });

            setSelectedServices([]);

            reset();
          } else {
            addToast({
              title: 'Erro',
              type: 'error',
              description:
                'Não foi possível registrar esse pedido, tente novamente.',
            });
          }
        }
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          if (selectedServices.length <= 0) {
            addToast({ title: 'Nenhum serviço selecionado.', type: 'error' });
          }

          const errors = getValidationsErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }
        addToast({
          title: 'Erro',
          description:
            'Não foi possível registrar essa venda, tente novamente.',
          type: 'error',
        });
      }
    },
    [addToast, selectedServices, user],
  );

  const handleCreateAnotherSale = useCallback(() => {
    setSuccessPage(null);
  }, []);

  return (
    <>
      <Container hidden={!!successPage}>
        <Menu />
        <Breadcrumb text="Registro de vendas" />
        <Content
          marginLeft="auto"
          marginRight="auto"
          width="100%"
          marginTop="26px"
          maxWidth={{
            xs: '90vw',
            sm: '90vw',
            md: '80vw',
            lg: '78vw',
            xl: '90vw',
          }}
        >
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Separator>
              <span>Dados do cliente</span>
              <div />
            </Separator>

            <Inputs
              maxWidth={{
                xs: '90vw',
                sm: '90vw',
                md: '90vw',
                lg: '72vw',
                xl: '62vw',
              }}
              marginTop="20px"
            >
              <InputContainer width="100%" maxWidth="280px">
                <div className="labels">
                  <span>Nome:</span>
                  <span>*</span>
                </div>
                <Input
                  className="input"
                  id="name"
                  type="name"
                  name="name"
                  style={{ width: '30px' }}
                />
              </InputContainer>

              <InputContainer width="100%" maxWidth="280px">
                <div className="labels">
                  <span>Cpf:</span>
                  <span>*</span>
                </div>
                <Input
                  className="input"
                  id="cpf"
                  type="cpf"
                  name="cpf"
                  style={{ width: '30px' }}
                />
              </InputContainer>

              <InputContainer width="100%" maxWidth="200px">
                <div className="labels">
                  <span>Carro:</span>
                  <span>*</span>
                </div>
                <Input
                  className="input"
                  id="car"
                  type="car"
                  name="car"
                  style={{ width: '30px' }}
                />
              </InputContainer>

              <InputContainer width="100%" maxWidth="200px">
                <div className="labels">
                  <span>Modelo:</span>
                </div>
                <Input
                  className="input"
                  id="carModel"
                  type="carModel"
                  name="carModel"
                  style={{ width: '30px' }}
                />
              </InputContainer>

              <InputContainer width="100%" maxWidth="180px">
                <div className="labels">
                  <span>Placa:</span>
                  <span>*</span>
                </div>
                <Input
                  className="input"
                  id="carPlate"
                  type="carPlate"
                  name="carPlate"
                  style={{ width: '30px' }}
                />
              </InputContainer>
            </Inputs>

            <Inputs style={{ marginTop: '16px' }}>
              <InputContainer width="100%" maxWidth="280px">
                <div className="labels">
                  <span>Cor do carro:</span>
                  <span>*</span>
                </div>
                <Input
                  className="input"
                  id="carColor"
                  type="carColor"
                  name="carColor"
                  style={{ width: '30px' }}
                />
              </InputContainer>

              <div className="SelectContainer">
                <div className="labels">
                  <span>Origem do carro:</span>
                  <span>*</span>
                </div>
                <Select
                  height="34px"
                  backgroundColor="#424242"
                  color="White"
                  name="sourceCar"
                  placeholder="Origem do carro"
                  containerProps={{
                    marginTop: '16px',
                    marginRight: 8,
                    width: '100%',
                    height: '37px',
                    border: '2px solid',
                    borderColor: '#585858',
                    backgroundColor: '#424242',
                  }}
                >
                  {selectOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </Select>
              </div>

              <Textarea name="comments" />
            </Inputs>

            <Separator>
              <span>Datas </span>
              <div />
            </Separator>

            <div className="DateTimesContainer">
              <div className="DateTimeContainer">
                <div className="labels">
                  <span>Data e hora de disponibilidade:</span>
                  <span>*</span>
                </div>
                <Datetime name="availabilityDate" />
              </div>

              <div className="DateTimeContainer">
                <div className="labels">
                  <span>Data e hora de entrega:</span>
                  <span>*</span>
                </div>
                <Datetime name="deliveryDate" />
              </div>
            </div>

            <Separator>
              <span>Serviços </span>
              <div />
            </Separator>
            <Services
              templateColumns={{
                xs: '15% 15% 15%',
                sm: '23% 23% 23% 23%',
                md: '17% 17% 17% 17% 17%',
                lg: '20% 20% 20% 20% 20%',
                xl: '15.6% 15.6% 15.6% 15.6% 15.6% 15.6%',
              }}
            >
              {services.map(service => (
                <ServiceBox
                  onClick={() => handleSelectService(service.id)}
                  className={
                    selectedServices.includes(service.id) ? 'selected' : ''
                  }
                  key={service.id}
                >
                  <span>{service.name}</span>
                </ServiceBox>
              ))}
            </Services>
            <Button type="submit">Salvar</Button>
          </Form>
        </Content>
      </Container>

      {successPage && (
        <RegisterSuccessPage hidden={!successPage}>
          <div className="content">
            <FiCheckCircle size={300} color="#2FB86E" />
            <h1>Pedido {successPage?.saleId} solicitado com sucesso.</h1>

            <div className="buttons">
              <Button
                skipButton
                type="button"
                onClick={handleCreateAnotherSale}
              >
                Voltar
              </Button>
            </div>
          </div>
        </RegisterSuccessPage>
      )}
    </>
  );
};

export default SalesRegister;

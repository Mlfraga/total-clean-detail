import React, { useRef, useCallback, ChangeEvent, useEffect, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { FiCheckCircle } from 'react-icons/fi';

import Header from '../../components/Header';
import Breadcrumb from '../../components/Breadcrumb';
import Input from '../../components/Input';
import Select from 'react-select';
import TextField from '@material-ui/core/TextField';
import Button from '../../components/Button';

import { useAuth } from '../../context/auth';
import { useToast } from '../../context/toast';
import getValidationsErrors from '../../utils/getValidationError';

import api from '../../services/api';

import { Container, Content, Inputs, Separator, InputContainer, Services, ServiceBox, RegisterSuccessPage } from './styles';

interface Services {
  id: number;
  name: string;
  price: Number;
  enabled: Boolean;
}

interface FormData {
  car: string;
  carColor: string;
  carModel: string;
  carPlate: string;
  cpf: string;
  name: string;
}

const SalesRegister = () => {
  const { user } = useAuth();
  const { addToast } = useToast();

  const formRef = useRef<FormHandles>(null);

  const [selectError, setSelectError] = useState(false);
  const [availabilityDateFieldError, setAvailabilityDateFieldError] = useState(false);
  const [deliveryDateFieldError, setDeliveryDateFieldError] = useState(false);
  const [successPage, setSuccessPage] = useState<{isAvailable: boolean, saleId?: number} | null>(null);

  const [services, setServices] = useState<Services[]>([]);
  const [selectedServices, setSelectedServices] = useState<Number[]>([]);
  const [availabilityDate, setAvailabilityDate] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [sourceCar, setSourceCar] = useState('');

  const selectOptions = [
    { value: 'NEW', label: 'Novo' },
    { value: 'USED', label: 'Semi-novo' },
    { value: 'WORKSHOP', label: 'Oficina' }
  ]
  useEffect(() => {
    api.get('services').then(response => {
      const services: Services[] = response.data;

      setServices(services);
    })
  }, [])

  const handleSelectService = useCallback((id: number) => {
    const alreadySelected = selectedServices.findIndex(item => item === id);

    if (alreadySelected >= 0) {
        const filteredItems = selectedServices.filter(item => item !== id);

        setSelectedServices(filteredItems);
    } else {
        setSelectedServices([...selectedServices, id]);
    }
  }, [selectedServices])

  const handleAvailabilityChange = useCallback((event: ChangeEvent<HTMLInputElement>)=>{
    setAvailabilityDate(event.target.value);
    setAvailabilityDateFieldError(false);
  }, []);

  const handleDeliveryChange = useCallback((event: ChangeEvent<HTMLInputElement>)=>{
    setDeliveryDate(event.target.value);
    setDeliveryDateFieldError(false);
  }, []);

  const handleChangeSourceCar = useCallback((newValue)=>{
    setSourceCar(newValue.value);
    setSelectError(false);
  }, []);

  const handleSubmit = useCallback(async (data: FormData, {reset}) => {
    const responseCompanyBudget = await api.post('/sale/getcompanysalebudget', { companyId: user.profile.companyId, services: selectedServices } )

    const companyPrice = responseCompanyBudget.data.companyPrice;

    const responseCostBudget = await api.post('/sale/getsalebudget', { services: selectedServices } );

    const costPrice = responseCostBudget.data.costPrice;

    try{
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          car: Yup.string().required('Carro obrigatório'),
          carColor: Yup.string().required('Cor do carro obrigatório'),
          carModel: Yup.string().required('Modelo do carro obrigatório'),
          carPlate: Yup.string().required('Placa do carro obrigatório').min(7, "Mínimo de 7 caracteres").max(8, "Máximo de 8 caracteres"),
          cpf: Yup.string().required('Cpf obrigatório').max(11, 'No máximo 11 dígitos'),
          name: Yup.string().required('Nome obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false
        });

        if (!sourceCar || !availabilityDate || !deliveryDate) {
          if(!sourceCar){
            setSelectError(true);
            addToast({title: "Campo origem de carro vazio.", type: "error"});
          }

          if(!availabilityDate){
            setAvailabilityDateFieldError(true);
            addToast({title: "Campo data de disponibilidade vazio.", type: "error"});
          }

          if(!deliveryDate){
            setDeliveryDateFieldError(true);
            addToast({title: "Campo data de entrega vazio.", type: "error"});
          }
          throw new Error('Delivery date, Availability date or Availability date is void.')
        }

        if(selectedServices.length <= 0){
          addToast({title: "Nenhum serviço selecionado.", type: "error"});
          throw new Error('Services are required.')
        }

        const createSaleData = {
         deliveryDate,
         availabilityDate,
         companyPrice,
         costPrice,
         source: sourceCar,
         name: data.name,
         cpf: data.cpf,
         car: data.car,
         carModel: data.carModel,
         carPlate: data.carPlate,
         carColor: data.carColor,
        }

        const responseCreatedSale = await api.post('sale', createSaleData);

        if(responseCreatedSale.status === 200){
          const createServiceSaleData = {
            saleId: responseCreatedSale.data.id,
            serviceIds: selectedServices
          }

          const responseCreatedServiceSale = await api.post('servicesale', createServiceSaleData);

          if(responseCreatedServiceSale.status === 200){
            addToast({title: "Sucesso", type: "success", description: `Pedido n° ${responseCreatedSale.data.id} registrado com sucesso.`})
            setSuccessPage({isAvailable: true, saleId: responseCreatedSale.data.id});
            setSelectedServices([]);
            setDeliveryDate('');
            setAvailabilityDate('');
            reset();
          }else{
            addToast({title: "Erro", type: "error", description: `Não foi possível registrar esse pedido, tente novamente.`})
          }
      }
    }catch(err){
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationsErrors(err);

        formRef.current?.setErrors(errors);


        if(!sourceCar){
          setSelectError(true);
          addToast({title: "Campo origem de carro vazio", type: "error"})
        }
        return
      }
    }

  },[addToast, availabilityDate, deliveryDate, selectedServices, sourceCar, user.profile.companyId]);

  const handleCreateAnotherSale = useCallback(()=>{
    setSuccessPage(null);
  }, [])
  return (
  <>
    <Container hidden={!successPage ? false : true }>
      <Header />
      <Breadcrumb text='Registro de vendas' />
      <Content >
        <Form ref={formRef} onSubmit={handleSubmit}>

          <Separator>
            <span>Dados do cliente</span>
            <div />
          </Separator >

          <Inputs style={{ marginTop: '20px' }}>
            <InputContainer style={{ width: '280px' }} >
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

            <InputContainer style={{ width: '280px' }} >
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

            <InputContainer style={{ width: '200px' }} >
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

            <InputContainer style={{ width: '200px' }} >
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

            <InputContainer style={{ width: '180px' }} >
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
            <InputContainer style={{ width: '180px' }} >
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
                  styles={{ control: base => ({
                    ...base,
                    marginTop: 14,
                    borderRadius: 6,
                    borderWidth: 2,
                    borderColor: selectError ? '#c53030' : '#585858',
                    backgroundColor: '#424242',
                    width: 300,
                    height: 20,
                    boxShadow: 'none',
                    fontSize: 16
                  }),
                  menu: base => ({
                    ...base,
                    backgroundColor: '#282828',
                    color: '#F4EDE8'

                  }),
                  singleValue: base => ({
                    ...base,
                    color: '#F4EDE8'
                  }),
                }}
                  options={selectOptions}
                  onChange={handleChangeSourceCar}
                  label="Single select"
                  className="select"
                  clearable={false}
                  placeholder="Selecione a origem do carro"
                  id="carColor"
                  type="carColor"
                  name="carColor"
                  />
              </div>
          </Inputs>

          <Separator>
            <span>Datas </span>
            <div />
          </Separator >
          <div className="DateTimeContainer">
            <div className="availability">
              <div className="labels">
                <span>Data e hora de disponibilidade:</span>
                <span>*</span>
              </div>
                <TextField
                  onChange={handleAvailabilityChange}
                  id={availabilityDateFieldError ?  "date-times-availability-errored" : "date-times-availability"}
                  type="datetime-local"
                  className="availability-date-time"
                  value={availabilityDate}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
            </div>
            <div className="delivery">
              <div className="labels">
                <span>Data e hora de entrega:</span>
                <span>*</span>
              </div>
                <TextField
                  onChange={handleDeliveryChange}
                  id={deliveryDateFieldError ?  "date-times-delivery-errored" : "date-times-delivery"}
                  type="datetime-local"
                  className="delivery-date-time"
                  value={deliveryDate}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
            </div>
         </div >

          <Separator>
            <span>Serviços </span>
            <div />
          </Separator>
          <Services>
           {services.map(service=>(
            <ServiceBox
            onClick={() => handleSelectService(service.id)}
            className={selectedServices.includes(service.id) ? 'selected' : ''}
            key={service.id}
            >
              <span>{service.name}</span>
            </ServiceBox>
           ))}
          </Services>
          <Button type="submit">Salvar</Button>
        </Form>
      </Content>
    </Container >

    {successPage &&
    <RegisterSuccessPage hidden={successPage ? false : true }>
      <div className="content" >
        <FiCheckCircle size={300} color='#2FB86E'/>
        <h1>Pedido {successPage?.saleId} solicitado com sucesso.</h1>

        <div className="buttons">
          <Button skipButton={true} type='button' onClick={handleCreateAnotherSale}>Voltar</Button>
        </div>
      </div>
    </RegisterSuccessPage>
    }
  </>
  );
}

export default SalesRegister;

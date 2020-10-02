import React, { useRef } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web'

import Header from '../../components/Header';
import Breadcrumb from '../../components/Breadcrumb';
import Input from '../../components/Input';

import { useAuth } from '../../context/auth';

import api from '../../services/api';

import { Container, Content, Inputs, Separator, InputContainer } from './styles';

const SalesRegister = () => {
  const { user } = useAuth();
  const formRef = useRef<FormHandles>(null);

  return (
    <Container>
      <Header />
      <Breadcrumb text='Registro de vendas' />
      <Content>
        <Form ref={formRef} onSubmit={() => { }}>

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
          </Inputs>
        </Form>
      </Content>
    </Container >
  );
}

export default SalesRegister;

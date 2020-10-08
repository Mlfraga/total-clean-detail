import React, { useRef, useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import { Container, Separator, Content, Inputs, InputContainer } from './styles';

import Header from '../../components/Header';
import Breadcrumb from '../../components/Breadcrumb';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Select from 'react-select';

import api from '../../services/api';

const RegsiterSellers = () => {
  const formRef = useRef<FormHandles>(null);

  const [selectError, setSelectError] = useState(false);
  const [role, setRole] = useState('');

  const selectOptions = [
    { value: 'SELLER', label: 'Vendedor' },
    { value: 'MANAGER', label: 'Gerente' }
  ]

  const handleChangeRole = useCallback((newValue)=>{
    setRole(newValue.value);
    setSelectError(false);
  }, []);

  return (
    <Container>
      <Header />

      <Breadcrumb text='Registro de vendedores' />

      <Content>
      <Form ref={formRef} onSubmit={()=>{}}>

        <Separator>
          <span>Dados do vendedor</span>
          <div />
        </Separator >
        <Inputs style={{ marginTop: '20px' }}>
          <InputContainer style={{ width: '285px' }} >
            <div className="labels">
              <span>Nome:</span>
              <span>*</span>
            </div>
            <Input
              className="input"
              id="name"
              type="name"
              name="name"
            />
          </InputContainer>

          <InputContainer style={{ width: '285px' }} >
            <div className="labels">
              <span>Telefone:</span>
              <span>*</span>
            </div>
            <Input
              className="input"
              id="telephone"
              type="telephone"
              name="telephone"
            />
          </InputContainer>

          <InputContainer style={{ width: '290px' }} >
            <div className="labels">
              <span>E-mail:</span>
              <span>*</span>
            </div>
            <Input
              className="input"
              id="email"
              type="email"
              name="email"
            />
          </InputContainer>

          <InputContainer style={{ width: '285px' }} >
            <div className="labels">
              <span>Username:</span>
              <span>*</span>
            </div>
            <Input
              className="input"
              id="email"
              type="email"
              name="email"
            />
          </InputContainer>
        </Inputs>
        <Inputs style={{ marginTop: '16px' }}>
          <div className="SelectContainer">
              <div className="labels">
                <span>Cargo do usuário:</span>
                <span>*</span>
              </div>
                <Select
                styles={{ control: base => ({
                  ...base,
                  marginTop: 14,
                  borderRadius: 6,
                  borderWidth: 2,
                  borderColor:  selectError ? '#c53030' : '#585858',
                  backgroundColor: '#424242',
                  width: 285,
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
                onChange={handleChangeRole}
                label="Single select"
                className="select"
                clearable={false}
                placeholder="Selecione o cargo do usuário"
                id="role"
                type="role"
                name="role"
                />
            </div>
          <InputContainer style={{ width: '285px', marginLeft: 16 }} >
            <div className="labels">
              <span>Senha:</span>
              <span>*</span>
            </div>
            <Input
              className="input"
              id="password"
              type="password"
              name="password"
            />
          </InputContainer>
        </Inputs>
        <div className="button">
          <Button type="submit">Salvar</Button>
        </div>
      </Form>
      </Content>
    </Container >
  );
}

export default RegsiterSellers;

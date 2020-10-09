import React, { useRef, useCallback, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import getValidationsErrors from '../../utils/getValidationError';

import { Container, Separator, Content, Inputs, InputContainer } from './styles';

import Header from '../../components/Header';
import Breadcrumb from '../../components/Breadcrumb';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Select from 'react-select';

import { useAuth } from '../../context/auth';
import { useToast } from '../../context/toast';

import api from '../../services/api';

interface SubmitFormData {
  name: string;
  email: string;
  password: string;
  telephone: string;
  username: string;
}

const RegsiterSellers = () => {
  const {user} = useAuth();
  const {addToast} = useToast();
  const formRef = useRef<FormHandles>(null);

  const [selectError, setSelectError] = useState(false);
  const [role, setRole] = useState('');

  const selectOptions = [
    { value: 'SELLER', label: 'Vendedor' },
    { value: 'MANAGER', label: 'Gerente' }
  ]

  const handleChangeRole = useCallback((newValue) => {
    setRole(newValue.value);
    setSelectError(false);
  }, []);

  const handleSubmit = useCallback(async(data: SubmitFormData, {reset}) => {
    try{
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        username: Yup.string().required('Usuário obrigatório'),
        password: Yup.string().required('Senha obrigatória'),
        email: Yup.string().required('E-mail obrigatório'),
        name: Yup.string().required('Nome obrigatório'),
        telephone: Yup.string().required('Telefone obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false
      });

      if(!role) {
        setSelectError(true);
        addToast({title: "Campo cargo de usuário vazio.", type: "error"});
        throw new Error('Role are required.')
      }

      const requestData = {
        username: data.username,
        email: data.email,
        password: data.password,
        role,
        name: data.name,
        telephone: data.telephone,
        enabled: true,
        companyId: user.profile.companyId,
        unitId: user.profile.unitId,
      }

    const response = await api.post('auth/signup', requestData);

    if(response.status === 200){
      addToast({title: "Sucesso", type: "success", description: `O usuário ${response.data.profile.name} já pode usar o sistema.`});
      reset();
    }else{
      addToast({title: "Erro", type: "error", description: `Ocorreu um erro, tente novamente.`});
    }
    }catch(err){
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationsErrors(err);

        formRef.current?.setErrors(errors);

        if(!role){
          setSelectError(true);
          addToast({title: "Campo cargo do usuário vazio", type: "error"})
        }
        return
      }
    }
  },[addToast, role, user.profile.companyId, user.profile.unitId])

  return (
    <Container>
      <Header />

      <Breadcrumb text='Registro de vendedores' />

      <Content>
      <Form ref={formRef} onSubmit={handleSubmit}>

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
              id="username"
              type="username"
              name="username"
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

import React, { useRef, useCallback, useState, useEffect } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import getValidationsErrors from '../../utils/getValidationError';
import { useHistory } from 'react-router-dom';

import { Container, Separator, Content, Inputs, InputContainer } from './styles';

import Header from '../../components/Header';
import Breadcrumb from '../../components/Breadcrumb';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Select from 'react-select';

import { useAuth } from '../../context/auth';
import { useToast } from '../../context/toast';

import api from '../../services/api';

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  telephone: string;
}

interface Unit {
  id: number;
  name: string;
}

const RegsiterSellers = () => {
  const history = useHistory();
  const {user} = useAuth();
  const {addToast} = useToast();
  const formRef = useRef<FormHandles>(null);

  const [unitSelectOptions, setUnitSelectOptions] = useState<Array<{value: number, label: string}>>([]);
  const [selectError, setSelectError] = useState(false);
  const [unit, setUnit] = useState('');

  useEffect(()=>{
    api.get(`units/${user.profile.companyId}`).then(response => {
      const unities: Unit[] = response.data;

      const unitiesOptions: Array<{value: number, label: string}> = unities.map((unit) => {
        return {value: unit.id, label: unit.name}
      });

      setUnitSelectOptions(unitiesOptions);
    }).catch(() => {
      history.push('/services');
      return
      });
  }, [history, user.profile.companyId])

  const handleChangeUnitSelect = useCallback((newValue) => {
    setUnit(newValue.value);
    setSelectError(false);
  }, []);

  const handleSubmit = useCallback(async(data: FormData, {reset}) => {
    try{
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        username: Yup.string().required('Usuário obrigatório'),
        password: Yup.string().required('Senha obrigatória'),
        email: Yup.string().required('E-mail obrigatório'),
        name: Yup.string().required('Nome obrigatório'),
        telephone: Yup.string().min(9, 'O telefone deve ter no mínimo 9 dígitos').max(11, 'O telefone deve ter no máximo 11 dígitos'),
        confirmPassword: Yup.string().required('Confirmação de senha obrigatória'),
      });

      await schema.validate(data, {
        abortEarly: false
      });

      if(!unit) {
        setSelectError(true);
        addToast({title: "Campo unidade de usuário vazio.", type: "error"});
        return
      }

      if(data.password !== data.confirmPassword){
        formRef.current?.setErrors({password: 'As senhas não batem.', confirmPassword: 'As senhas não batem.'})
        return
      }

      const requestData = {
        username: data.username,
        email: data.email,
        password: data.password,
        role: 'SELLER',
        name: data.name,
        telephone: data.telephone,
        enabled: true,
        companyId: user.profile.companyId,
        unitId: unit,
      }

      const response = await api.post('auth/signup', requestData);

      if(response.status === 200){
        addToast({title: "Sucesso", type: "success", description: `Vendedor registrado com sucesso.`})
        reset();
      }else{
        addToast({title: "Erro", type: "error", description: `Ocorreu um erro, tente novamente.`});
      }
    }catch(err){
      if(!unit){
        setSelectError(true);
      }

      if (err instanceof Yup.ValidationError) {
        const errors = getValidationsErrors(err);

        formRef.current?.setErrors(errors);

        return
      }
      addToast({title: "Não foi possível realizar o cadastro.", description: 'Esse usuário já foi criado ou ocorreu um erro, tente novamente.', type: "error"});
      }
  },[addToast, unit, user.profile.companyId])

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

          <div
            className="SelectContainer"
            style={{marginLeft: 16, width: 300}}
            >
            <div className="labels">
              <span>Unidade do vendedor:</span>
              <span>*</span>
            </div>
              <Select
              styles={{ control: base => ({
                ...base,
                marginTop: 14,
                borderRadius: 6,
                borderWidth: 2,
                width: 300,
                borderColor:  selectError ? '#c53030' : '#585858',
                backgroundColor: '#424242',
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
              options={unitSelectOptions}
              onChange={handleChangeUnitSelect}
              label="Single select"
              className="select"
              clearable={false}
              placeholder="Selecione a unidade do vendedor"
              id="unit"
              type="unit"
              name="unit"
              />
          </div>
        </Inputs>

        <Separator>
          <span>Dados da conta vendedor</span>
          <div />
        </Separator >

        <Inputs style={{ marginTop: '16px' }}>

        <InputContainer style={{ width: '22%' }} >
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

        <InputContainer style={{ width: '28%' }} >
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

          <InputContainer style={{ width: '25%', marginLeft: 16 }} >
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

          <InputContainer style={{ width: '25%', marginLeft: 16 }} >
            <div className="labels">
              <span>Confirmar Senha:</span>
              <span>*</span>
            </div>
            <Input
              className="input"
              id="confirmPassword"
              type="password"
              name="confirmPassword"
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

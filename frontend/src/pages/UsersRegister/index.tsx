import React, {useCallback, useEffect, useState, useRef} from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';

import getValidationsErrors from '../../utils/getValidationError';
import { useToast } from '../../context/toast';

import api from '../../services/api';

import Header from '../../components/Header';
import Input from '../../components/Input';
import Breadcrumb from '../../components/Breadcrumb';
import Button from '../../components/Button';
import Select from 'react-select';

import { Container, Content, Separator, InputContainer, Inputs } from './styles';

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  name: string;
  telephone: string;
}

interface DataSubmit {
  username: string;
  email: string;
  password: string;
  role: string;
  name: string;
  telephone: string;
  companyId: number;
  unitId?: number;
  enabled: boolean;
}

interface Company {
  id: number;
  name: string;
  units: [
    {
      id: number;
      name: string;
    }
  ]
}

const UsersRegister = () => {
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const [company, setCompany] = useState<Company>({} as Company);
  const [role, setRole] = useState<{value: string, label: string} | null >(null);
  const [roleSelectErrored, setRoleSelectErrored] = useState<boolean>(false);
  const [unitSelectErrored, setUnitSelectErrored] = useState<boolean>(false);
  const [unit, setUnit] = useState<{value: string, label: string} | null >(null);
  const [unitSelectOptions, setUnitSelectOptions] = useState<Array<{value: number, label: string}>>([]);

  const roleSelectOptions = [
    { value: 'SELLER', label: 'Vendedor' },
    { value: 'MANAGER', label: 'Gerente' }
  ]

  useEffect(() => {
    const query = history.location.search;

    const parsedQuery = queryString.parse(query, {parseNumbers: true});

    if(!parsedQuery.company || typeof parsedQuery.company !== 'number'){
      history.push('/services');
      return
    }

    api.get(`companies/${parsedQuery.company}`).then(response => {
      const company: Company = response.data;

      const unitiesOptions: Array<{value: number, label: string}> = company.units.map((unit) => {
        return {value: unit.id, label: unit.name}
      });

      setUnitSelectOptions(unitiesOptions);
      setCompany({id: company.id, name: company.name, units: company.units});
    }).catch(() => {
      history.push('/services');
      return
      });
  }, [history])

  const handleChangeRoleSelect = useCallback((newValue) => {
    setRole(newValue);
    setRoleSelectErrored(false);
  }, []);

  const handleChangeUnitSelect = useCallback((newValue) => {
    setUnit(newValue);
    setUnitSelectErrored(false);
  }, []);

  const handleSubmit = useCallback(async (data: FormData, {reset})=>{
    try{
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome do usuário obrigatório'),
        telephone: Yup.string().min(9, 'O telefone deve ter no mínimo 9 dígitos').max(11, 'O telefone deve ter no máximo 11 dígitos'),
        username: Yup.string().required('Nome de login obrigatório'),
        email: Yup.string().required('E-mail obrigatório'),
        password: Yup.string().required('Senha obrigatória'),
        confirmPassword: Yup.string().required('Confirmação de senha obrigatória'),
      });

      await schema.validate(data, {
        abortEarly: false
      });

      if(data.password !== data.confirmPassword){
        formRef.current?.setErrors({password: 'As senhas não batem.', confirmPassword: 'As senhas não batem.'})
      }

      if(!role){
        setRoleSelectErrored(true);
        return;
      }

      if(role.value === 'SELLER'){
        if(!unit){
          setUnitSelectErrored(true);
          return;
        }

        const formDataToCreateSeller: DataSubmit = {
          username: data.username,
          email: data.email,
          password: data.password,
          role: role.value,
          name: data.name,
          telephone: data.telephone,
          companyId: company?.id,
          unitId: Number(unit.value),
          enabled: true,
        }

        const response = await api.post('auth/signup', formDataToCreateSeller);

        if(response.status === 200 ){
          addToast({title: "Cadastro realizado com sucesso.", type: 'success', description: `Agora o usuário ${data.username} já pode utilizar o sistema.`});

          reset();
        }
        return;
      }

      const formDataToCreateManager: DataSubmit = {
        username: data.username,
        email: data.email,
        password: data.password,
        role: role.value,
        name: data.name,
        telephone: data.telephone,
        companyId: company.id,
        enabled: true,
      }

      const response = await api.post('auth/signup', formDataToCreateManager);

      if(response.status === 200 ){
        addToast({title: "Cadastro realizado com sucesso.", type: 'success', description: `Agora o usuário ${data.username} já pode utilizar o sistema.`});

        reset();
      }

    }catch(err){
      if(!role){
        setRoleSelectErrored(true);
      }

      if(role?.value === 'SELLER'){
        if(!unit){
          setUnitSelectErrored(true);
        }
      }

      if (err instanceof Yup.ValidationError) {
        const errors = getValidationsErrors(err);

        formRef.current?.setErrors(errors);
        return
      }

      addToast({title: "Não foi possível realizar o caadastro.", description: 'Esse usuário já foi criado ou ocorreu um erro, tente novamente.', type: "error"})
    }
  },[addToast, company, role, unit]);

  return (
    <Container>
      <Header/>
      <Breadcrumb text="Registro de novos usuários"/>
      <Content>
        <Form ref={formRef} onSubmit={handleSubmit} >
        <Separator>
            <span>Dados do usário</span>
            <div />
        </Separator >

        <Inputs >

          <InputContainer style={{ width: '250px' }} >
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

          <InputContainer style={{ width: '250px' }} >
            <div className="labels">
              <span>Telephone:</span>
              <span>*</span>
            </div>
            <Input
              className="input"
              id="telephone"
              type="telephone"
              name="telephone"
              style={{ width: '30px' }}
            />
          </InputContainer>

          <div className="SelectContainer" style={{width: '265'}}>
            <div className="labels">
              <span>Cargo:</span>
              <span>*</span>
            </div>
              <Select
              styles={{ control: base => ({
                ...base,
                marginTop: 14,
                borderRadius: 6,
                borderWidth: 2,
                borderColor: roleSelectErrored ? '#c53030' : '#585858',
                backgroundColor: '#424242',
                width: 265,
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
              options={roleSelectOptions}
              onChange={handleChangeRoleSelect}
              label="Single select"
              className="select"
              clearable={false}
              placeholder="Selecione o cargo do usuário"
              id="unit"
              type="unit"
              name="unit"
              />
          </div>

          <div
          hidden={role?.value === "SELLER" ? false : true }
          className="SelectContainer">
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
                borderColor: unitSelectErrored ? '#c53030' : '#585858',
                backgroundColor: '#424242',
                width: 297,
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
              id="role"
              type="role"
              name="role"
              />
          </div>

        </Inputs>

        <Separator>
          <span>Dados do conta</span>
          <div />
        </Separator >

          <Inputs >

            <InputContainer style={{ width: '275px' }} >
                <div className="labels">
                  <span>Nome de login:</span>
                  <span>*</span>
                </div>
                <Input
                  className="input"
                  id="username"
                  type="username"
                  name="username"
                  style={{ width: '30px' }}
                />
              </InputContainer>

              <InputContainer style={{ width: '300px' }} >
                <div className="labels">
                  <span>E-mail:</span>
                  <span>*</span>
                </div>
                <Input
                  className="input"
                  id="email"
                  type="email"
                  name="email"
                  style={{ width: '30px' }}
                />
              </InputContainer>

              <InputContainer style={{ width: '250px' }} >
                <div className="labels">
                  <span>Senha:</span>
                  <span>*</span>
                </div>
                <Input
                  className="input"
                  id="password"
                  type="password"
                  name="password"
                  style={{ width: '30px' }}
                />
              </InputContainer>

              <InputContainer style={{ width: '250px' }} >
                <div className="labels">
                  <span>Comfirmar senha:</span>
                  <span>*</span>
                </div>
                <Input
                  className="input"
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  style={{ width: '30px' }}
                />
              </InputContainer>

        </Inputs>

          <Button type='submit'>Cadastrar</Button>
        </Form>
      </Content>
    </Container >
  );
}

export default UsersRegister;

import React, { useCallback, useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import queryString from 'query-string';
import * as Yup from 'yup';

import Breadcrumb from '../../components/Breadcrumb';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Menu from '../../components/Menu';
import Select from '../../components/Select';
import { useToast } from '../../context/toast';
import api from '../../services/api';
import getValidationsErrors from '../../utils/getValidationError';
import {
  Container,
  Content,
  Separator,
  InputContainer,
  Inputs,
} from './styles';

interface IFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  unit: string;
  name: string;
  telephone: string;
}

interface IDataSubmit {
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

interface ICompany {
  id: number;
  name: string;
  units: [
    {
      id: number;
      name: string;
    },
  ];
}

const UsersRegister = () => {
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const [company, setCompany] = useState<ICompany>({} as ICompany);
  const [role, setRole] = useState<string>('');
  const [unitSelectOptions, setUnitSelectOptions] = useState<
    Array<{ value: number; label: string }>
  >([]);

  const roleSelectOptions = [
    { value: 'SELLER', label: 'Vendedor' },
    { value: 'MANAGER', label: 'Gerente' },
  ];

  useEffect(() => {
    const query = history.location.search;

    const parsedQuery = queryString.parse(query, { parseNumbers: true });

    if (!parsedQuery.company || typeof parsedQuery.company !== 'number') {
      history.push('/services');
      return;
    }

    api
      .get(`companies/${parsedQuery.company}`)
      .then(response => {
        const newCompany: ICompany = response.data;

        const unitiesOptions: Array<{
          value: number;
          label: string;
        }> = newCompany.units.map(unit => ({
          value: unit.id,
          label: unit.name,
        }));

        setUnitSelectOptions(unitiesOptions);
        setCompany({
          id: newCompany.id,
          name: newCompany.name,
          units: newCompany.units,
        });
      })
      .catch(() => {
        history.push('/services');
      });
  }, [history]);

  const handleChangeRoleSelect = useCallback(
    newValue => {
      setRole(newValue.target.value);
    },
    [setRole],
  );

  const handleSubmit = useCallback(
    async (data: IFormData, { reset }) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome do usuário obrigatório'),
          telephone: Yup.string()
            .min(9, 'O telefone deve ter no mínimo 9 dígitos')
            .max(11, 'O telefone deve ter no máximo 11 dígitos'),
          username: Yup.string().required('Nome de login obrigatório'),
          email: Yup.string().required('E-mail obrigatório'),
          role: Yup.string().required('Cargo do usuário obrigatório'),
          unit:
            role === 'SELLER'
              ? Yup.string().required('Unidade do usuário obrigatório')
              : Yup.string(),
          password: Yup.string().required('Senha obrigatória'),
          confirmPassword: Yup.string().required(
            'Confirmação de senha obrigatória',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        if (data.password !== data.confirmPassword) {
          formRef.current?.setErrors({
            password: 'As senhas não batem.',
            confirmPassword: 'As senhas não batem.',
          });
          return;
        }

        if (role === 'SELLER') {
          const formDataToCreateSeller: IDataSubmit = {
            username: data.username,
            email: data.email,
            password: data.password,
            role: data.role,
            name: data.name,
            telephone: data.telephone,
            companyId: company?.id,
            unitId: Number(data.unit),
            enabled: true,
          };

          const response = await api.post(
            'auth/signup',
            formDataToCreateSeller,
          );

          if (response.status === 200) {
            addToast({
              title: 'Cadastro realizado com sucesso.',
              type: 'success',
              description: `Agora o usuário ${data.username} já pode utilizar o sistema.`,
            });

            setRole('');

            reset();
          }
          return;
        }

        const formDataToCreateManager: IDataSubmit = {
          username: data.username,
          email: data.email,
          password: data.password,
          role: data.role,
          name: data.name,
          telephone: data.telephone,
          companyId: company.id,
          enabled: true,
        };

        const response = await api.post('auth/signup', formDataToCreateManager);

        if (response.status === 200) {
          addToast({
            title: 'Cadastro realizado com sucesso.',
            type: 'success',
            description: `Agora o usuário ${data.username} já pode utilizar o sistema.`,
          });

          reset();
        }
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationsErrors(err);

          formRef.current?.setErrors(errors);
        } else {
          addToast({
            title: 'Não foi possível realizar o cadastro.',
            description:
              'Esse usuário já foi criado ou ocorreu um erro, tente novamente.',
            type: 'error',
          });
        }
      }
    },
    [addToast, company, role],
  );

  return (
    <Container>
      <Menu />
      <Breadcrumb
        text={`Registro de novos usuários a concessionŕia ${company.name}`}
      />
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
            <span>Dados do usário</span>
            <div />
          </Separator>

          <Inputs>
            <InputContainer style={{ width: '250px' }}>
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

            <InputContainer style={{ width: '250px' }}>
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

            <div className="SelectContainer" style={{ width: '265' }}>
              <div className="labels">
                <span>Cargo:</span>
                <span>*</span>
              </div>
              <Select
                height="34px"
                backgroundColor="#424242"
                color="White"
                name="role"
                onChange={handleChangeRoleSelect}
                placeholder="Selecione o cargo do usuário"
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
                {roleSelectOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </Select>
            </div>

            {role === 'SELLER' && (
              <div className="SelectContainer">
                <div className="labels">
                  <span>Unidade do vendedor:</span>
                  <span>*</span>
                </div>
                <Select
                  height="34px"
                  backgroundColor="#424242"
                  color="White"
                  name="unit"
                  placeholder="Selecione a unidade do vendedor"
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
                  {unitSelectOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </Select>
              </div>
            )}
          </Inputs>

          <Separator>
            <span>Dados do conta</span>
            <div />
          </Separator>

          <Inputs>
            <InputContainer style={{ width: '275px' }}>
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

            <InputContainer style={{ width: '300px' }}>
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

            <InputContainer style={{ width: '250px' }}>
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

            <InputContainer style={{ width: '250px' }}>
              <div className="labels">
                <span>Confirmar senha:</span>
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

          <Button type="submit">Salvar</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default UsersRegister;

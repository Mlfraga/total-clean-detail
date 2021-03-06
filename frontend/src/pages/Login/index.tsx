import React, { useRef, useCallback } from 'react';
import { FiLock, FiUser } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import logo from '../../assets/Icon.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useAuth } from '../../context/auth';
import { useToast } from '../../context/toast';
import getValidationsErrors from '../../utils/getValidationError';
import { Container, Content, Background } from './styles';

interface ISignInFormData {
  username: string;
  password: string;
}

const Login = () => {
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: ISignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          username: Yup.string().required('Usuário obrigatório'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          username: data.username,
          password: data.password,
        });

        history.push('/services');

        addToast({ title: 'Login realizado', type: 'success' });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationsErrors(err);

          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          title: 'Erro ao fazer login',
          type: 'error',
          description: 'Erro ao autenticar usuário, credenciais inválidas',
        });
      }
    },
    [addToast, history, signIn],
  );

  return (
    <Container>
      <Content>
        <div className="logo">
          <h1>Total Clean</h1>
          <img src={logo} alt="TotalClean"></img>
        </div>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input
            className="input"
            id="username"
            type="text"
            name="username"
            placeholder="Usuário"
            icon={FiUser}
          />

          <Input
            className="input"
            id="password"
            type="password"
            name="password"
            placeholder="Senha"
            icon={FiLock}
          />
          <Button type="submit">Entrar</Button>
        </Form>
      </Content>
      <Background />
    </Container>
  );
};

export default Login;

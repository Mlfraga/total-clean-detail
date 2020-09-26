import React, { useRef, useCallback } from 'react';
import { FiLock, FiUser } from 'react-icons/fi'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { useAuth } from '../../context/AuthContext';
import logo from "../../assets/Icon.svg"

import { Container, Content, Background } from './styles';

interface SignInFormData {
  username: string;
  password: string;
}

const Login = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();

  const handleSubmit = useCallback(async (data: SignInFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        username: Yup.string().required('Usuário obrigatório'),
        password: Yup.string().required('Senha obrigatória'),
      });

      await schema.validate(data, {
        abortEarly: false
      });

      signIn({
        username: data.username,
        password: data.password
      });

    } catch (err) {
      console.log(err);
    }
  }, [signIn]);

  return (
    <Container>
      <Content>
        <div className="logo">
          <h1>Total Clean</h1>
          <img src={logo} alt="TotalClean"></img>
        </div>
        <Form onSubmit={handleSubmit}>
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
      < Background />
    </Container >
  );
}

export default Login;

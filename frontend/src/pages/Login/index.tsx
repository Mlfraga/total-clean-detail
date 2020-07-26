import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import logo from "../../assets/Icon.svg"
import Container from './styles';

import Button from '../../components/Button';

import api from '../../services/api';

function initialState() {
  return { username: '', password: '' }
}

const Login = () => {
  const [values, setValues] = useState(initialState);
  const [invalidLogin, setInvalidLogin] = useState('');


  const history = useHistory();

  function handleOnChangeInput(event: ChangeEvent<HTMLInputElement>) {
    const { value, name } = event.target

    setValues({ ...values, [name]: value, });
  }

  async function login(values: any) {
    try {
      const response = await api.post('auth/login', values)

      const token = response.data.accessToken;
      const refreshToken = response.data.refreshToken;

      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);

      return token;

    } catch (err) {
      setValues(initialState);
      setInvalidLogin('Usuário ou senha inválidos.')
    }

  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!values.password || !values.username) {
      return
    }

    const token = await login(values);

    if (token) {

      return history.push('/configurar-precos');
    }

  }

  return (
    <Container>
      <div id='login-page'>
        <div className="form">
          <div className="logo">
            <h1>Total Clean</h1>
            <img src={logo} alt="TotalClean"></img>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="inputs">
              <input
                className="input"
                id="username"
                type="text"
                name="username"
                onChange={handleOnChangeInput}
                value={values.username}
                placeholder="Usuário"
              />

              <input
                className="input"
                id="password"
                type="password"
                name="password"
                onChange={handleOnChangeInput}
                value={values.password}
                placeholder="Senha"
              />
              <span>{invalidLogin}</span>
            </div>
            <Button buttonType="submit" text="Entrar" />
          </form>
        </div>
        <div className="wallpaper">
          <img
            id="wallpaper"
            alt="Wallpaper"
            src="https://images.unsplash.com/photo-1523676060187-f55189a71f5e?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
          >
          </img>
        </div>

      </div>
    </Container >
  );
}

export default Login;

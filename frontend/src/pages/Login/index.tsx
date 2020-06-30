import React, { useState, ChangeEvent, FormEvent } from 'react';

import logo from "../../assets/Icon.svg"

import Container from './styles';

import Button from '../../components/Button';

import api from '../../services/api';

function initialState() {
    return { user: '', password: '' }
}

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [values, setValues] = useState(initialState)

    function onChange(event: ChangeEvent<HTMLInputElement>) {
        const { value, name } = event.target

        setValues({ ...values, [name]: value, });
    }

    async function handleLogin(event: FormEvent) {
        event.preventDefault();
        const data = {
            username: username,
            password: password
        }

        try {
            const response = await api.post('auth/login', data)

            localStorage.setItem('token', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            console.log(localStorage.token)
            console.log(localStorage.refreshToken)

        } catch (err) {
            alert('Login inválido.');
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
                    <form onSubmit={() => console.log("ok")}>
                        <div className="inputs">
                            <input className="input"
                                id="user"
                                type="text"
                                name="user"
                                onChange={onChange}
                                value={values.user}
                                placeholder="Usuário"
                            />

                            <input
                                className="input"
                                id="password"
                                type="password"
                                name="password"
                                onChange={onChange}
                                value={values.password}
                                placeholder="Senha"
                            />
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
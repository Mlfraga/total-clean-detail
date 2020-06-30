import React from 'react';

import Container from './styles';

import logo from "../../assets/Icon.svg"

const Header = () => {
    return (
        <Container>
            <div>
                <h1 >Total Clean</h1>
                <img src={logo} alt="TotalClean"></img>
            </div>
        </Container>
    );
}

export default Header;
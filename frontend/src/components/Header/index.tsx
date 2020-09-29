import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Container, Logo, Buttons } from './styles';
import { useAuth } from '../../context/auth';

import logo from '../../assets/Icon.svg'

const Header: React.FC = () => {
  const history = useHistory();
  const initialSelectedButton = history.location.pathname;
  const [selected, setSelected] = useState(initialSelectedButton);
  const { buttons } = useAuth();

  return (
    <Container>
      <Logo>
        <h1 >Total Clean</h1>
        <img src={logo} alt="TotalClean"></img>
      </Logo>
      <Buttons >
        {buttons.map(button => (
          <Link
            key={button.route}
            className={selected === button.route ? 'header-button-selected' : 'header-button'}
            to={`${button.route}`}
            onClick={() => setSelected(button.route)}>
            {button.name}
          </Link>
        ))}
      </Buttons>
    </Container>
  );
}

export default Header;

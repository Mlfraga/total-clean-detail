import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Container from './styles';

import logo from '../../assets/Icon.svg'

interface ButtonInterface {
  name: string;
  route: string;
}

interface HeaderProps {
  buttons: ButtonInterface[];
}

const Header: React.FC<HeaderProps> = ({ buttons }) => {
  const history = useHistory();
  const initialSelectedButton = history.location.pathname.replace('/', '');
  const [selected, setSelected] = useState(initialSelectedButton);
  return (
    <Container>
      <div className="header">
        <div className="logo">
          <h1 >Total Clean</h1>
          <img src={logo} alt="TotalClean"></img>
        </div>
        <div className="buttonsContainer">
          <div className="buttons">
            {buttons.map(button => (
              <Link
                key={button.route}
                className={selected === button.route ? 'header-button-selected' : 'header-button'}
                to={`/${button.route}`}
                onClick={() => setSelected(button.route)}>
                {button.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Header;

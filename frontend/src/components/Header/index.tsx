import React, { useState } from 'react';
import { CgLogOut } from 'react-icons/cg';
import { FiMenu } from 'react-icons/fi';
import MediaQuery from 'react-responsive';
import { Link, useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import logo from '../../assets/Icon.svg';
import { useAuth } from '../../context/auth';
import { Container, Logo, Buttons } from './styles';

const Header: React.FC = () => {
  const history = useHistory();
  const initialSelectedButton = history.location.pathname;
  const [selected, setSelected] = useState(initialSelectedButton);
  const { buttons, signOut } = useAuth();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Container>
      <Logo>
        <h1>Total Clean</h1>
        <img src={logo} alt="TotalClean"></img>
      </Logo>

      <MediaQuery minDeviceWidth={1224}>
        <Buttons direction="row-reverse">
          <Link to="/" onClick={signOut}>
            <CgLogOut size={20} />
            Sair
          </Link>
          {buttons?.map(button => (
            <Link
              key={button.route}
              className={
                selected === button.route
                  ? 'header-button-selected'
                  : 'header-button'
              }
              to={`${button.route}`}
              onClick={() => setSelected(button.route)}
            >
              {button.name}
            </Link>
          ))}
        </Buttons>
      </MediaQuery>

      <MediaQuery maxDeviceWidth={1224}>
        <Buttons direction="row-reverse">
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <FiMenu size={25} color="#fff" />
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {buttons?.map(button => (
              <Link
                key={button.route}
                to={`${button.route}`}
                onClick={() => setSelected(button.route)}
              >
                <MenuItem onClick={() => setSelected(button.route)}>
                  {button.name}
                </MenuItem>
              </Link>
            ))}
            <Link to="/" onClick={signOut}>
              <MenuItem onClick={signOut}>Sair</MenuItem>
            </Link>
          </Menu>
        </Buttons>
      </MediaQuery>
    </Container>
  );
};

export default Header;

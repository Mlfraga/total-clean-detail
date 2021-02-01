/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import signInBackgroundImg from '../../assets/sign-in-background-3.jpg';
import Breadcrumb from '../../components/Breadcrumb';
import Menu from '../../components/Menu';
import { useAuth } from '../../context/auth';
import api from '../../services/api';
import { Container, Content } from './styles';

const Services = () => {
  const history = useHistory();
  const { user } = useAuth();

  useEffect(() => {
    if (user?.profile.companyId) {
      if (user?.role === 'MANAGER') {
        api.get('companyservices/company').then(response => {
          const companyservices = response.data;

          if (companyservices.length === 0) {
            history.push('set-prices');
          }
        });
      }
    }
  }, [history, user]);

  return (
    <Container>
      <Menu />

      <Breadcrumb text="Serviços" />
      <Content
        marginLeft="auto"
        marginRight="auto"
        width="100%"
        maxWidth={{
          xs: '90vw',
          sm: '90vw',
          md: '80vw',
          lg: '78vw',
          xl: '90vw',
        }}
        justifyItems="space-between"
        marginTop="25px"
        justifyContent="space-bettween"
        gridTemplateColumns="32.3% 32.3% 32.3%"
      >
        <div onClick={() => history.push('/service/vitrificacao')}>
          <img className="images" src={signInBackgroundImg} alt="img" />
          <span id="text">Vitrificação de Pintura</span>
        </div>
        <div onClick={() => history.push('/service/vitrificacao')}>
          <img className="images" src={signInBackgroundImg} alt="img" />
          <span id="text">Vitrificação de Pintura</span>
        </div>
        <div onClick={() => history.push('/service/vitrificacao')}>
          <img className="images" src={signInBackgroundImg} alt="img" />
          <span id="text">Vitrificação de Pintura</span>
        </div>

        <div onClick={() => history.push('/service/vitrificacao')}>
          <img className="images" src={signInBackgroundImg} alt="img" />
          <span id="text">Vitrificação de Pintura</span>
        </div>
        <div onClick={() => history.push('/service/vitrificacao')}>
          <img className="images" src={signInBackgroundImg} alt="img" />
          <span id="text">Vitrificação de Pintura</span>
        </div>
        <div onClick={() => history.push('/service/vitrificacao')}>
          <img className="images" src={signInBackgroundImg} alt="img" />
          <span id="text">Vitrificação de Pintura</span>
        </div>
      </Content>
    </Container>
  );
};

export default Services;

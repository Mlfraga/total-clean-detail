import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { Container, Content } from './styles';

import Header from '../../components/Header';
import Breadcrumb from '../../components/Breadcrumb';
import signInBackgroundImg from '../../assets/sign-in-background-3.jpg';

import api from '../../services/api';
import { useAuth } from '../../context/auth';

const Services = () => {
  const history = useHistory();
  const { user } = useAuth();

  useEffect(() => {
    if (user.profile.companyId) {
      api.get('companyservices/company').then(response => {
        const companyservices = response.data;

        if (companyservices.length === 0) {
          history.push('set-prices')
          return;
        }
      })
    } else {
      console.log('É ADMIN');
    }
  }, [history, user.profile.companyId])

  return (
    <Container>
      <Header />

      <Breadcrumb text='Serviços' />
      <Content>
        <tbody>
          <tr>
            <th>
              <div onClick={() => history.push('/service/vitrificacao')}>
                <img className='images' src={signInBackgroundImg} alt="img" />
                <span id='text'>Vitrificação de Pintura</span>
              </div>
            </th>
            <th>
              <div onClick={() => history.push('/service/vitrificacao')}>
                <img className='images' src={signInBackgroundImg} alt="img" />
                <span id='text'>Vitrificação de Pintura</span>
              </div>
            </th>
            <th>
              <div onClick={() => history.push('/service/vitrificacao')}>
                <img className='images' src={signInBackgroundImg} alt="img" />
                <span id='text'>Vitrificação de Pintura</span>
              </div>
            </th>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <th>
              <div onClick={() => history.push('/service/vitrificacao')}>
                <img className='images' src={signInBackgroundImg} alt="img" />
                <span id='text'>Vitrificação de Pintura</span>
              </div>
            </th>
            <th>
              <div onClick={() => history.push('/service/vitrificacao')}>
                <img className='images' src={signInBackgroundImg} alt="img" />
                <span id='text'>Vitrificação de Pintura</span>
              </div>
            </th>
            <th>
              <div onClick={() => history.push('/service/vitrificacao')}>
                <img className='images' src={signInBackgroundImg} alt="img" />
                <span id='text'>Vitrificação de Pintura</span>
              </div>
            </th>
          </tr>
        </tbody>
      </Content>

    </Container >
  );
}

export default Services;

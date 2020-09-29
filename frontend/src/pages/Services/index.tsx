import React from 'react';
import { useHistory } from 'react-router-dom';

import { Container, Content } from './styles';

import Header from '../../components/Header';
import Breadcrumb from '../../components/Breadcrumb';
import signInBackgroundImg from '../../assets/sign-in-background-3.jpg';

const Services = () => {

  const history = useHistory();
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

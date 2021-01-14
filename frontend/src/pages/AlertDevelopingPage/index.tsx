import React from 'react';
import { BiErrorAlt } from 'react-icons/bi';
import { useHistory } from 'react-router-dom';

import Button from '../../components/Button';
import { Container } from './styles';

const AlertDevelopingPage = () => {
  const history = useHistory();
  return (
    <Container>
      <div className="box">
        <BiErrorAlt color="#ff6659" size={200} />
        <h1>Ooooops...</h1>
        <p>Essa página ainda esta em desenvolvimento.</p>
        <Button skipButton onClick={() => history.push('services')}>
          Voltar ao início
        </Button>
      </div>
    </Container>
  );
};

export default AlertDevelopingPage;

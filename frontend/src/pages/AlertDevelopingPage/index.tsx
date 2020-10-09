import React from 'react';
import {useHistory} from 'react-router-dom';
import { BiErrorAlt } from 'react-icons/bi';

import { Container } from './styles';

import Button from '../../components/Button';

const RegsiterSellers = () => {
  const history = useHistory();
  return (
    <Container>
      <div className="box">
        <BiErrorAlt color='#ff6659' size={200}/>
        <h1>Ooooops...</h1>
        <p>Essa página ainda esta em desenvolvimento.</p>
        <Button skipButton={true} onClick={()=>history.push('services')}>Voltar ao início</Button>
      </div>
    </Container >
  );
}

export default RegsiterSellers;

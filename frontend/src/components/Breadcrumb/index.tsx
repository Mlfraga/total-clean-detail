import React from 'react';
import { Container } from './styles';

interface BreaadCrumbProps {
  text: string;
}

const Breadcrumb: React.FC<BreaadCrumbProps> = ({ text }) => {
  return (
    <Container >
      <div >
        <span>{text}</span>
      </div>
    </Container>
  )
}

export default Breadcrumb;

import React from 'react';

import { Container } from './styles';

interface IInterfaceProps {
  text: string;
}

const Separator: React.FC<IInterfaceProps> = ({ text }) => (
  <Container
    maxWidth={{
      xs: '90vw',
      sm: '90vw',
      md: '90vw',
      lg: '78vw',
      xl: '90vw',
    }}
  >
    <span>{text}</span>
    <div />
  </Container>
);

export default Separator;

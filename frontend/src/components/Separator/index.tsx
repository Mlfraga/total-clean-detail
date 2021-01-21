import React from 'react';

import { Container } from './styles';

interface IInterfaceProps {
  text: string;
}

const Separator: React.FC<IInterfaceProps> = ({ text }) => {
  return (
    <Container>
      <span>{text}</span>
      <div />
    </Container>
  );
}

export default Separator;

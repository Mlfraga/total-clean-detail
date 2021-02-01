import React from 'react';

import { Container } from './styles';

interface IBreaadCrumbProps {
  text: string;
}

const Breadcrumb: React.FC<IBreaadCrumbProps> = ({ text }) => (
  <Container
    backgroundColor="#ff6659"
    width="100%"
    maxWidth={{
      xs: '90vw',
      sm: '90vw',
      md: '80vw',
      lg: '78vw',
      xl: '90vw',
    }}
    color="#eee"
    display="flex"
    marginLeft="auto"
    marginRight="auto"
    padding="12px 15px"
    borderRadius="md"
    fontWeight="bold"
  >
    <span>{text}</span>
  </Container>
);

export default Breadcrumb;

import React from 'react';

import { Box } from '@chakra-ui/core';

import { Container } from './styles';

interface IBreaadCrumbProps {
  text: string;
}

const Breadcrumb: React.FC<IBreaadCrumbProps> = ({ text }) => (
  <Container>
    <Box
      backgroundColor="#ff6659"
      width="100%"
      maxWidth={{
        xs: '90vw',
        sm: '90vw',
        md: '90vw',
        lg: '72vw',
        xl: '62vw',
      }}
      color="#eee"
      display="flex"
      marginLeft="auto"
      marginRight="auto"
      padding="12px 15px"
      borderRadius="md"
      marginTop="30px"
      fontWeight="bold"
    >
      <span>{text}</span>
    </Box>
  </Container>
);

export default Breadcrumb;

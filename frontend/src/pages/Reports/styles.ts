import { Box as ChakraBox } from '@chakra-ui/core';
import styled from 'styled-components';

export const Container = styled(ChakraBox)`
  @import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@700&display=swap');
  height: 100vh;

  @media (min-width: 1224px) {
    padding-left: 80px;
    padding-top: 45px;
  }
`;

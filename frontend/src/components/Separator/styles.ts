import Box from '@chakra-ui/core/dist/Box';
import styled from 'styled-components';

export const Container = styled(Box)`
  width: 100%;

  display: flex;
  align-items: center;
  margin-top: 25px;

  span {
    font: 20px 'Ubuntu', sans-serif;
    font-weight: bold;
    color: #eee;
  }

  div {
    height: 2px;
    flex: 1;

    background: #686868;
    margin-left: 10px;
    margin-top: 3px;
  }
`;

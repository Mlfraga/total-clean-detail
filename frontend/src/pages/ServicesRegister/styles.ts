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

export const Content = styled(ChakraBox)`
  .inputs {
    height: 650px;
    display: flex;
  }

  button {
    width: 300px;
    float: right;
  }
`;

export const Separator = styled.div`
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

export const InputContainer = styled.div`
  margin-top: 36px;

  & + div {
    margin-left: 46px;
  }

  div.labels {
    background: transparent;
    border: 0;
    display: flex;
    justify-content: space-between;

    span {
      font: 18px 'Ubuntu', sans-serif;
      margin-left: 4px;
      font-weight: 400;
      color: #eee;

      & + span {
        color: #ff6f60;
      }
    }
  }

  div {
    margin-top: 6px;
    height: 30px;
    border-radius: 6px;
    background: #424242;

    div {
      background: #424242;
      border: 0;
      height: 26px;
    }
  }
`;

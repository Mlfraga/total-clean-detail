import { Box as ChakraBox } from '@chakra-ui/core';
import styled from 'styled-components';

export const Container = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@700&display=swap');
  height: 100%;

  @media (min-width: 1224px) {
    padding-left: 80px;
    padding-top: 45px;
  }
`;

export const Content = styled(ChakraBox)`
  div.button {
    width: 250px;
    margin-top: 400px;

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

export const Inputs = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;

  .SelectContainer {
    div.labels {
      background: transparent;
      border: 0;
      display: flex;
      justify-content: space-between;
      margin-top: 5px;
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
  }
`;

export const InputContainer = styled.div`
  & + div {
    margin-left: 16px;
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

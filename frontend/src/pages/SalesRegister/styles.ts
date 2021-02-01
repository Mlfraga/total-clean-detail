import {
  Box as ChakraBox,
  Flex as ChakraFlex,
  Grid as ChakraGrid,
} from '@chakra-ui/core';
import { shade } from 'polished';
import styled from 'styled-components';

export const RegisterSuccessPage = styled.div`
  width: 100%;
  height: 100vh;
  background: #252525;

  .content {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    svg {
      margin-bottom: 80px;
    }
    h1 {
      margin-bottom: 30px;
    }

    .buttons {
      width: 250px;
      display: flex;

      button {
        & + button {
          margin-left: 16px;
        }
      }
    }
  }
`;

export const Container = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;700&display=swap');
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap');

  height: 100vh;

  @media (min-width: 1224px) {
    padding-left: 80px;
    padding-top: 45px;
  }
`;

export const Content = styled(ChakraBox)`
  textarea::placeholder {
    color: #fff;
  }

  .DateTimesContainer {
    width: 80%;
    display: flex;
    flex-direction: 'row';
    align-items: center;

    .DateTimeContainer {
      width: 100%;
      margin-right: 16px;
      max-width: 330px;

      div.labels {
        background: transparent;
        border: 0;
        display: flex;
        justify-content: space-between;
        margin-top: 25px;

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
  }

  button {
    float: right;
    width: 150px;
    margin-top: 25px;
  }
`;

export const Separator = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 25px;

  span {
    font: 18px 'Ubuntu', sans-serif;
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

export const Inputs = styled(ChakraFlex)`
  width: 100%;
  display: flex;

  .SelectContainer {
    width: 100%;
    max-width: 280px;
    margin-right: 16px;

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

export const InputContainer = styled(ChakraBox)`
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

export const ServiceBox = styled.div`
  max-width: 165px;
  height: 65px;
  background: #424242;
  border: 2px solid #555555;

  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  cursor: pointer;

  transition: background-color 0.2s;
  :hover {
    background: ${shade(0.2, '#424242')};
  }

  span {
    font-size: 16px;
    text-align: center;
    padding: 5px 5px;
  }
`;

export const Services = styled(ChakraGrid)`
  width: 100%;
  height: 210px;
  margin-top: 10px;
  overflow: auto;
  justify-content: space-between;
  grid-template-columns: 13% 13% 13% 13% 13% 13% 13%;
  grid-template-rows: 70px 70px 70px 70px 70px 70px 70px;

  .selected {
    border-color: #ff6f60;
  }
`;

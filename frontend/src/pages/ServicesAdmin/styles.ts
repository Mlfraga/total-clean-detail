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
  margin-left: auto;
  margin-right: auto;
  width: 100%;

  .boxTitle {
    display: grid;
    grid-template-columns: 30% 16% 19% 33%;
    align-items: center;
    justify-content: center;

    margin-top: 25px;
    margin-top: 25px;
    background: #282828;
    height: 60px;
    border-radius: 15px;
  }

  .button {
    margin-top: 30px;
    float: right;
    width: 250px;
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

export const List = styled.div`
  width: 100.5%;
  height: 550px;
  overflow: auto;
  margin-top: 16px;

  ::-webkit-scrollbar {
    width: 6px;
    background: #383838;
  }

  ::-webkit-scrollbar-thumb {
    background: #525252;
    border-radius: 20px;
  }

  .box {
    display: grid;
    grid-template-columns: 30% 16% 20% 2.5% 30%;
    align-items: center;
    justify-content: center;

    background: #303030;
    height: 60px;
    border-radius: 15px;

    & + div {
      margin-top: 16px;
    }
    span {
      display: flex;
      align-items: center;
      font: 15px 'Ubuntu', sans-serif;
      font-weight: 400;

      div.unabled {
        margin-right: 8px;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: #ff6f60;
      }

      div.enabled {
        margin-right: 8px;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: #94ec94;
      }
    }

    span {
      font: 15px 'Ubuntu', sans-serif;
      font-weight: 400;
    }
  }
`;

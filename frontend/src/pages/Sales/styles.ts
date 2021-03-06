import { Box as ChakraBox } from '@chakra-ui/core';
import styled from 'styled-components';

export const Container = styled(ChakraBox)`
  @import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@700&display=swap');
  height: 100%;

  @media (min-width: 1224px) {
    padding-left: 80px;
    padding-top: 45px;
  }
`;

export const Content = styled(ChakraBox)`
  .boxTitle {
    display: grid;
    grid-template-columns: 5% 14% 13% 13% 18% 18% 14% 5%;
    align-items: center;
    justify-content: center;
    padding-left: 10px;

    margin-top: 12px;
    background: #282828;
    height: 60px;
    border-radius: 15px;

    span {
      font: 16px 'Ubuntu', sans-serif;
      font-weight: bold;
    }
  }
  div.updateSaleContainer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 600px;
    float: right;

    button {
      width: 250px;
      height: 40px;
      margin-top: 36px;
    }

    .SelectContainer {
      width: 250px;
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
  }
`;

export const Separator = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 14px;

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

export const List = styled(ChakraBox)`
  ::-webkit-scrollbar {
    width: 6px;
    background: #383838;
  }

  ::-webkit-scrollbar-thumb {
    background: #525252;
    border-radius: 20px;
  }
`;

export const Box = styled(ChakraBox)`
  width: 100%;

  & + div {
    margin-top: 16px;
  }

  div.header {
    padding-left: 10px;
    display: grid;
    width: 100%;
    grid-template-columns: 5% 14% 13% 13% 18% 18% 14% 5%;
    align-items: center;
    justify-content: center;

    background: #303030;
    height: 60px;
    border-radius: 15px 15px 0 0;

    span {
      display: flex;
      align-items: center;
      font: 15px 'Ubuntu', sans-serif;
      font-weight: 200;
      div {
        margin-right: 6px;
        border-radius: 50%;
        width: 12px;
        height: 12px;
      }
    }
  }

  div.header-selected {
    padding-left: 10px;
    display: grid;
    width: 100%;
    grid-template-columns: 5% 14% 13% 13% 18% 18% 14% 5%;
    align-items: center;
    justify-content: center;

    border: 2px solid #ff6f60;
    background: #303030;
    height: 60px;
    border-radius: 15px 15px 0 0;

    span {
      display: flex;
      align-items: center;
      font: 15px 'Ubuntu', sans-serif;
      font-weight: 400;
      div {
        margin-right: 6px;
        border-radius: 50%;
        width: 12px;
        height: 12px;
      }
    }
  }

  div.status {
    div.FINISHED {
      background: #94ec94;
    }

    div.CANCELED {
      background: #ff6f60;
    }

    div.PENDING {
      background: #ffffa8;
    }

    div.CONFIRMED {
      background: #5eb8ff;
    }
  }

  .dropDown {
    width: 100%;
    background: #353535;
    border-radius: 0 0 15px 15px;
    padding: 10px 16px 20px 16px;

    div.separator {
      margin-top: 5px;
      span {
        font: 16px 'Ubuntu', sans-serif;
      }
    }

    div.service {
      width: 100%;
      margin-top: 16px;
      background: #424242;
      min-height: 35px;
      border-radius: 8px;
      padding-left: 26px;

      display: grid;
      grid-template-columns: 275px 275px;
      align-items: center;
      & + div {
        margin-top: 8px;
      }
    }
    div.total {
      margin-top: 16px;
      background: #424242;
      min-height: 35px;
      border-radius: 8px;
      padding-left: 26px;

      display: grid;
      grid-template-columns: 275px 275px;
      align-items: center;
      & + div {
        margin-top: 8px;
      }
    }
  }
`;

import { Box as ChakraBox } from '@chakra-ui/core';
import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@700&display=swap');
  height: 100vh;

  @media (min-width: 1224px) {
    padding-left: 80px;
    padding-top: 45px;
  }

  .edition-mode-container {
    position: absolute;
    width: 100vw;
    height: 100vh;
    top: 0;
    background: rgba(0, 0, 0, 0.3);

    display: flex;
    align-items: center;
    justify-content: center;

    section {
      width: 100%;
      max-width: 600px;
      height: 450px;
      background: #323232;
      border-radius: 15px;
      border: 1.5px solid #525252;
      .header {
        display: flex;
        align-items: center;
        flex-direction: column;
        padding: 15px;

        h1 {
          font: 30px 'Ubuntu', sans-serif;
          font-weight: bold;
          color: #ccc;
        }

        span.service-name {
          margin-top: 16px;
          font: 25px 'Ubuntu', sans-serif;
          color: #ccc;
        }

        .company-service-data-header {
          margin-top: 48px;
          display: grid;
          grid-template-columns: 50% 50%;
          font: 18px 'Ubuntu', sans-serif;
          font-weight: bold;
          color: #ccc;

          width: 80%;
        }

        .company-service-data {
          margin-top: 18px;
          display: grid;
          grid-template-columns: 50% 50%;
          font: 18px 'Ubuntu', sans-serif;
          color: #ccc;

          width: 80%;
        }
      }

      .input {
        font: 18px 'Ubuntu', sans-serif;
        font-weight: bold;
        color: #ccc;
        margin-top: 26px;
        margin-left: 66px;
        max-width: 270px;
        width: 80%;

        label {
          margin-left: 6px;
        }

        div {
          margin-top: 10px;
          height: 34px;
        }
      }

      .buttons {
        display: flex;
        width: 300px;
        float: right;
        margin-top: 36px;

        button {
          height: 40px;
          margin-right: 16px;
        }
      }
    }
  }
`;

export const Content = styled(ChakraBox)`
  .boxTitle {
    display: grid;
    grid-template-columns: 25% 15% 15% 40% 5%;
    align-items: center;
    justify-content: center;
    padding-left: 10px;

    margin-top: 25px;
    background: #282828;
    height: 60px;
    border-radius: 15px;
    color: #ccc;

    span {
      font: 16px 'Ubuntu', sans-serif;
      font-weight: bold;
    }
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
  width: 100%;
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
`;

export const Box = styled.div`
  display: grid;
  grid-template-columns: 25% 15% 15% 40% 5%;
  padding-left: 10px;
  align-items: center;
  justify-content: center;
  width: 100%;

  background: #303030;
  height: 60px;
  border-radius: 15px;
  color: #ccc;

  & + div {
    margin-top: 16px;
  }

  span {
    display: flex;
    align-items: center;
    font: 15px 'Ubuntu', sans-serif;
    font-weight: 400;
  }

  svg {
    cursor: pointer;
    color: #ccc;
  }

  svg:hover {
    color: ${shade(0.2, '#ccc')};
  }
`;

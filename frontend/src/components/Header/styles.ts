import { Box, Flex } from '@chakra-ui/core';
import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled(Box)`
  @import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@700&display=swap');

  z-index: 1000;
  display: flex;
  align-items: center;
  height: 80px;
  background: #282828;
  width: 100%;
`;

export const Buttons = styled(Flex)`
  flex: 1;
  margin-right: 50px;
  height: 100%;
  display: flex;
  align-items: center;

  svg {
    margin-right: 6px;
  }

  a {
    display: flex;
    align-items: center;
    font: 14px 'Ubuntu', sans-serif;
    font-weight: 400;
    text-decoration: none;
    transition: color 0.2s;

    color: #ced4da;

    & + a {
      margin-right: 45px;
    }

    &:hover {
      color: ${shade(0.2, '#ced4da')};
    }
  }

  .header-button-selected {
    color: #ff6659;

    &:hover {
      color: ${shade(0.2, '#ff6659')};
    }
  }
`;

export const Logo = styled.div`
  max-width: 200px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 35px;
  h1 {
    font: 30px 'Ubuntu', sans-serif;
    font-weight: bold;
    position: absolute;
    color: #ff6659;
  }
  img {
    height: 46px;
    width: 46px;
    margin-left: 168px;
    padding-bottom: 11.4px;
  }
`;

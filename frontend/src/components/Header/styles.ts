import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@700&display=swap');

  display: flex;
  align-items: center;
  height: 80px;
  background: #282828;
  width: 100%;
  position: fixed;
`;

export const Buttons = styled.div`
  flex: 1;
  margin-right: 50px;
  height: 100%;
  display: flex;
  flex-direction: row-reverse;
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
      color: ${shade(0.2, '#ced4da')}
    }
  }

  .header-button-selected{
    color: #ff6659;

    &:hover{
      color: ${shade(0.2, '#ff6659')}
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
    h1{
    font: 30px 'Ubuntu', sans-serif;
    font-weight: bold;
    position: absolute;
    color: #ff6659;
    }
    img{
    height: 46px;
    width: 46px;
    margin-left: 168px;
    padding-bottom: 11.4px;
    }
`;

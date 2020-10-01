import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@700&display=swap');

height: 100%;
`;

export const Content = styled.div`
  margin-left: auto;
  margin-right: auto;
  margin-top: 25px;
  width: 100%;
  max-width: 1200px;

  form {
    margin-left: auto;
    margin-right: auto;
    max-width: 1200px;

    display: flex;
    flex-wrap: wrap;
    flex-direction: row-reverse;
    justify-content: space-between;
  }
`;

export const PriceBox = styled.div`
  display: flex;
  flex-direction: column;

  max-width: 285px;
  width: 100%;
  height: 135px;

  border-radius: 8px;
  border: 2px solid #626262;
  border-radius: 10px;
  background: #282828;
  margin-bottom: 25px;

  .title-container {
    width: 100%;
    text-align: center;
    margin-top: 16px;

    span {
      font: 16px 'Ubuntu', sans-serif;
      color: #F4EDE8;
    }
  }

  span {
    font: 14px 'Ubuntu', sans-serif;
    color: ${shade(0.2, '#F4EDE8')};
    margin-left: 16px;
  }

 .inputs {
    max-width: 250px;
    margin-left: 16px;

    div {
      height: 34px;
    }
  }
`;

export const Buttons = styled.div`
  display: flex;

  width: 100%;
  max-width: 450px;

  button {
    & + button {
      margin-left: 16px;
    }
  }
`;

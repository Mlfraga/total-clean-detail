import styled from 'styled-components';

export const Container = styled.div`
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@700&display=swap');
  height: 100vh;
`;

export const Content = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  max-width: 1200px;

  .inputs {
    height: 650px;
    display: flex;
  }

  button {
    width: 300px;
    float: right;
    margin-top: 400px;
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
  margin-top: 30px;

  & + div {
    margin-left: 46px;
  }

  div.labels{
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
        color: #FF6F60;
      }
    }
  }

  div{
    margin-top: 6px;
    height: 30px;
    border-radius: 6px;
    background: #424242;

    div{
      background: #424242;
      border: 0;
      height: 26px;
    }
  }
`

export const Inputs = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  align-items: center;

    .SelectContainer {
      div.labels{
        background: transparent;
        border: 0;
        display: flex;
        justify-content: space-between;
        margin-top: 39px;

      span {
        font: 18px 'Ubuntu', sans-serif;
        margin-left: 4px;
        font-weight: 400;
        color: #eee;

        & + span {
          color: #FF6F60;
        }
      }
    }

    & + div {
      margin-left: 46px;
    }
  }
`;

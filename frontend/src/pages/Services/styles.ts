import styled from 'styled-components';

export const Container = styled.div`
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@700&display=swap');

height: 100vh;
`;

export const Content = styled.div`
  margin-left: auto;
  margin-right: auto;
  margin-top: 25px;
  width: 100%;
  max-width: 1200px;

  display: grid;
  justify-content: space-between;
  grid-template-columns: 32.3% 32.3% 32.3%;

  div {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  border-radius: 8px;
  background: #383838;
  border: 2px solid #626262;
  width: 100%;
  margin-bottom: 26px;

  border: 2px solid #626262;
  border-radius: 10px;
  padding: 15px 15px;

  cursor: pointer;

    img {
      border-radius: 8px;
      max-width: 95%;
    }

    span {
      font: 16px 'Ubuntu', sans-serif;
      color: #ced4da;
      padding-bottom: 8px;
      padding-top: 15px;
    }
  }
`;


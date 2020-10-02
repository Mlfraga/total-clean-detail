import styled from 'styled-components';

export const Container = styled.div`
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@700&display=swap');

height: 100%;
`;

export const Content = styled.table`
  margin-left: auto;
  margin-right: auto;
  margin-top: 25px;
  width: 100%;
  max-width: 1200px;

  tr{
    width: 1200px;

    th {
    border: 10px solid transparent;
    background-clip: padding-box;
    }
  }

  div {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  border-radius: 8px;
  background: #383838;
  border: 2px solid #626262;
  width: 100%;
  max-width: 383px;

  border: 2px solid #626262;
  border-radius: 10px;
  padding: 15px 15px;

  cursor: pointer;

    & + div {
      margin-left: 25px;
    }

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


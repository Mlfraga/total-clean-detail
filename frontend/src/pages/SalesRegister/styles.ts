import styled from 'styled-components';

interface InputContainerProps {
  width: number;
}

export const Container = styled.div`
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;700&display=swap');
@import url('https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap');

  height: 100vh;
`;

export const Content = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  max-width: 1200px;
`;

export const Separator = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    margin-top: 35px;

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

export const Inputs = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
`;

export const InputContainer = styled.div`

 & + div {
   margin-left: 16px;
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
    border: 1.5px solid #585858;
  }
`

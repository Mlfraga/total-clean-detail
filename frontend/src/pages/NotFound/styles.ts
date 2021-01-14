import styled from 'styled-components';

import backgroundPattern from '../../assets/Pattern-Developing-Page.svg';

export const Container = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@700&display=swap');
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: url(${backgroundPattern});

  .box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #282828;
    padding: 70px 90px;
    border-radius: 20px;
    h1 {
      font-size: 40px;
      color: #ced4da;
      font-family: 'Ubuntu';
      margin-bottom: 30px;
    }

    p {
      font-family: 'Ubuntu';
      color: #ced4da;
      font-size: 20px;
    }

    button {
      margin-top: 30px;
    }
  }
`;

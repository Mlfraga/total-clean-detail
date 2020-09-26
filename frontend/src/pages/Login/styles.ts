import styled from 'styled-components';

import signInBackgroundImg from '../../assets/sign-in-background-6.jpg';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
`
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #282828;

  width: 100%;
  max-width: 700px;

  .logo{
    max-width: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ff6659;

    h1{
    font: 45px 'Ubuntu', sans-serif;
    position: absolute;
    }

    img{
    height: 58px;
    width: 58px;
    margin-left: 246px;
    padding-bottom: 13.4px;
    }
}

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${signInBackgroundImg}) no-repeat center;
  background-size: cover;

  filter: grayscale(85%);
  `;

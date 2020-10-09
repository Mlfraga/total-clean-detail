import styled from 'styled-components';
import backgroundPattern from '../../assets/Pattern-Developing-Page.svg';

export const Container = styled.div`
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@700&display=swap');
  height: 100vh;
`;

export const Content = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  max-width: 1200px;

  .boxTitle {
    display: grid;
    grid-template-columns: 16% 16% 14% 10% 8% 18% 12% 4%;
    align-items: center;
    justify-content: center;

    margin-top: 25px;
    background: #282828;
    height: 60px;
    border-radius: 8px;
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

  & + div {
    margin-top: 16px;
  }


 div.header{
    display: grid;
    max-width: 1200px;
    width: 100%;
    grid-template-columns: 16% 16% 14% 10% 8% 18% 12% 4%;
    align-items: center;
    justify-content: center;

    background: #303030;
    height: 60px;
    border-radius: 15px 15px 0 0;

      span {
        display: flex;
        align-items: center;
        font: 15px 'Ubuntu', sans-serif;
        font-weight: 400;
        div{
          margin-right: 6px;
          border-radius: 50%;
          width: 12px;
          height:12px;
          background: #94EC94;
        }
      }
  }
    .dropDown {
      background: #353535;
      border-radius: 0 0 15px 15px;
      padding: 10px 16px 20px 16px;

      div.separator{
        margin-top: 5px;
        span{
          font: 16px 'Ubuntu', sans-serif;
        }
      }

      div.service{
        margin-top: 16px;
        background: #424242;
        min-height: 35px;
        border-radius: 8px;
        padding-left: 26px;

        display: grid;
        grid-template-columns: 275px 275px;
        align-items: center;
        & + div {
          margin-top: 8px;
        }
      }
      div.total{
        margin-top: 16px;
        background: #424242;
        min-height: 35px;
        border-radius: 8px;
        padding-left: 26px;

        display: grid;
        grid-template-columns: 275px 275px;
        align-items: center;
        & + div {
          margin-top: 8px;
        }
      }
    }
`;

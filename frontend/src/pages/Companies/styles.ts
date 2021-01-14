import { shade } from 'polished';
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

  .boxTitle {
    display: grid;
    grid-template-columns: 15% 16% 14% 11% 10% 18% 12% 4%;
    align-items: center;
    justify-content: center;
    padding-left: 10px;

    margin-top: 25px;
    background: #282828;
    height: 60px;
    border-radius: 15px;

    span {
      font: 16px 'Ubuntu', sans-serif;
      font-weight: bold;
    }
  }

  .button {
    margin-top: 30px;
    float: right;
    width: 300px;
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

  div.header {
    padding-left: 10px;
    display: grid;
    max-width: 1200px;
    width: 100%;
    grid-template-columns: 15% 15% 65% 5%;
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
      div {
        margin-right: 6px;
        border-radius: 50%;
        width: 12px;
        height: 12px;
      }
    }
  }

  .dropDown {
    background: #353535;
    border-radius: 0 0 15px 15px;
    padding: 10px 16px 20px 16px;

    .createNewCompanyLink {
      display: flex;
      align-items: center;
      text-decoration: none;

      font: 14px 'Ubuntu', sans-serif;
      font-weight: 400;

      color: #ff6659;
      transition: color 0.2s;

      margin-top: 16px;
      &:hover {
        color: ${shade(0.2, '#ff6659')};
      }
    }

    div.separator {
      margin-top: 5px;
      span {
        font: 16px 'Ubuntu', sans-serif;
      }
    }

    div.title {
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

      span {
        font: 16px 'Ubuntu', sans-serif;
        font-weight: bold;
      }
    }

    div.unit {
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

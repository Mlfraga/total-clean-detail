import styled from 'styled-components';

export const Container = styled.div`
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@700&display=swap');
  height: 100%;
`;

export const Content = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  max-width: 1200px;

  .boxTitle {
    display: grid;
    grid-template-columns: 14.6% 16% 19% 16% 16% 16%;
    align-items: center;
    justify-content: center;

    margin-top: 25px;
    margin-top: 25px;
    background: #303030;
    height: 60px;
    border-radius: 8px;
  }

  .button {
    margin-top: 30px;
    float: right;
    width: 250px;
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
  width: 100.5%;
  height: 550px;
  overflow: auto;
  margin-top: 16px;

  ::-webkit-scrollbar {
    width: 6px;
    background: #383838;
  }

  ::-webkit-scrollbar-thumb {
    background: #303030;
    border-radius: 20px;
  }

  .box {
    display: grid;
    grid-template-columns: 14.6% 16% 19% 16% 16% 16%;
    align-items: center;
    justify-content: center;

    background: #303030;
    height: 60px;
    border-radius: 8px;

    & + div {
      margin-top: 16px;
    }

    span {
      font: 15px 'Ubuntu', sans-serif;
      font-weight: 400;
    }
  }
`;

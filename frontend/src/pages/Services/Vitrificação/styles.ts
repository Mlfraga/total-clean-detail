import styled from 'styled-components';

const Container = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@700&display=swap');

  height: 100%;

  .body {
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
    flex-wrap: wrap;
  }

  .content {
    margin-top: 15px;
    width: 100%;
    min-height: 560px;
    background-color: #383838;
    border: 2px solid #626262;
    border-radius: 8px;
    display: flex;
    margin-bottom: 100px;

    span {
      width: 100%;
      flex: 1;
      font: 20px 'Roboto', sans-serif;
      line-height: 28px;
      text-align: justify;
      color: #ccc;
      margin-top: 10px;
      padding: 0 15px;
    }
  }

  .image {
    margin-top: 15px;
    margin-right: 15px;
    max-height: 242px;
    img {
      max-width: 500px;
      border: 1.5px solid #626262;
      border-radius: 10px;
    }
  }
`;

export default Container;

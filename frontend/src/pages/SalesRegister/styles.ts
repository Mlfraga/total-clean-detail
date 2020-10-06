import styled from 'styled-components';
import { shade } from 'polished';

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

  .DateTimeContainer {
    width: 100%;
    display: flex;

    div.availability {
        width: 40%;
        div.labels{
          background: transparent;
          border: 0;
          display: flex;
          justify-content: space-between;
          margin-top: 25px;
          max-width: 355px;

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
        .MuiFormControl-root.MuiTextField-root.availability-date-time {
        width: 100%;
        max-width: 355px;
          .MuiInput-underline:after {
            border-bottom: 2px solid #FF6F60;
          }
        }

        .MuiFormControl-root.MuiTextField-root.availability-date-time-errored {
        width: 100%;
        max-width: 355px;
          .MuiInput-underline:after {
            border-bottom: 2px solid #FF6F60;
          }
        }
    }

    div.delivery{
      width: 40%;

      div.labels{
        background: transparent;
        border: 0;
        display: flex;
        justify-content: space-between;
        margin-top: 25px;
        max-width: 355px;

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

      .MuiFormControl-root.MuiTextField-root.delivery-date-time {
        width: 100%;
        max-width: 355px;
        .MuiInput-underline:after {
          border-bottom: 2px solid #FF6F60;
        }
      }
    }

      #date-times-availability {
        margin-top: 10px;
        width: 100%;

        height: 30px;
        border-radius: 6px;
        background: #424242;
        border: 2.5px solid #585858;

        color: #ccc;
      }

      #date-times-availability-errored {
        margin-top: 10px;
        width: 100%;

        height: 30px;
        border-radius: 6px;
        background: #424242;
        border: 2.5px solid #c53030;

        color: #ccc;
      }

      #date-times-delivery {
        margin-top: 10px;
        width: 100%;

        height: 30px;
        border-radius: 6px;
        background: #424242;
        border: 2.5px solid #585858;

        color: #ccc;
      }

      #date-times-delivery-errored {
        margin-top: 10px;
        width: 100%;

        height: 30px;
        border-radius: 6px;
        background: #424242;
        border: 2.5px solid #c53030;

        color: #ccc;
      }
  }

  button {
    position: absolute;
    right: 0;
    margin-right: 354px;
    width: 150px;
    margin-top: 25px;
  }
`;

export const Separator = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    margin-top: 25px;

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

    .SelectContainer {

      div.labels{
        background: transparent;
        border: 0;
        display: flex;
        justify-content: space-between;
        margin-top: 5px;

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
  }
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


    div{
      background: #424242;
      border: 0;
      height: 26px;
    }
  }
`

export const ServiceBox = styled.div `
  margin-top: 16px;
  width: 150px;
  height: 50px;
  background: #424242;
  border: 2px solid #555555;

  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;

  transition: background-color 0.2s;
  :hover {
    background: ${shade(0.2, '#424242')};
  }

  span {
    font-size:16px;
    text-align: center;
    padding: 5px 5px;
  }
`;

export const Services = styled.div `
  width: 100%;
  height: 210px;
  margin-top: 10px;
  overflow: auto;
  display: grid;
  justify-content: space-between;
  grid-template-columns: 150px 150px 150px 150px 150px 150px 150px;
  grid-template-rows: 70px 70px 70px 70px 70px 70px 70px;

  .selected {
    border-color: #FF6F60;
  }
`;

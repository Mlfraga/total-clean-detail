import { Box, DefaultTheme } from '@chakra-ui/core';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { transparentize } from 'polished';

interface IContainerProps {
  theme: DefaultTheme;
  isErrored: boolean;
}

export const Container = styled(Box)<IContainerProps>`
  --base-color: #718096;
  --text-color-focused: #4a5568;
  --focused-box-shadow: 0 0 0 3px transparentize(0.4, #4a5568);
  --errored-box-shadow: 0 0 0 3px transparentize(0.4, #e53e3e);

  color: var(--base-color);
  cursor: text;

  display: flex;
  align-items: center;
  width: 100%;

  transition: box-shadow 0.2s;

  ${props =>
    props.isErrored &&
    css`
      #date-times {
        margin-top: 10px;
        width: 100%;

        height: 30px;
        border-radius: 6px;
        background: #f3f;
        border: 2.5px solid #e53e3e;

        color: #ccc;
      }
    `}

  input {
    flex: 1;
    height: 100%;
    background: transparent;
    border: 0;
    color: var(--text-color-focused);

    &::placeholder {
      color: var(--base-color);
    }
  }

  #date-times {
    margin-top: 10px;
    width: 100%;

    height: 30px;
    border-radius: 6px;
    background: #424242;
    border: 2.5px solid #585858;

    color: #ccc;

    ${props =>
      props.isErrored &&
      css`
      margin-top: 10px;
      width: 100%;

      height: 30px;
      border-radius: 6px;
      background: #424242;
      border: 2.5px solid #E53E3E;

      color: #ccc;
      }
    `}
  }

  .MuiFormControl-root {
    border: 0;
    margin: 0;
    display: inline-flex;
    padding: 0;
    width: 100%;
    position: relative;
    min-width: 0;
    flex-direction: column;
  }

  .MuiFormControl-root.MuiTextField-root.date-times {
    width: 100%;
    max-width: 355px;
    .MuiInput-underline:after {
      border-bottom: 2px solid #ff6f60;
    }
  }
`;

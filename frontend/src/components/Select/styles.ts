import { Box, DefaultTheme } from '@chakra-ui/core';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

interface IContainerProps {
  theme: DefaultTheme;
  isFocused: boolean;
  isFilled: boolean;
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

  transition: box-shadow 0.2s;

  ${props =>
    props.isErrored &&
    css`
      box-shadow: #e53e3e;
      border-color: #e53e3e;
    `}

  ${props =>
    props.isFocused &&
    css`
      box-shadow: var(--focused-box-shadow);
      color: var(--text-color-focused) !important;
    `}

  ${props =>
    props.isFilled &&
    css`
      color: var(--text-color-focused) !important;
    `}

  svg {
    margin-right: 16px;
  }

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
`;

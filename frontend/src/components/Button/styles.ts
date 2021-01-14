import { shade } from 'polished';
import styled, { css } from 'styled-components';

interface ContainerProps {
  skipbutton: boolean;
}

export const Container = styled.button<ContainerProps>`
  background: #ff6659;
  height: 56px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  color: #312e38;
  font-size: 18px;
  width: 100%;
  font-weight: 500;
  margin-top: 16px;
  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.2, '#ff6659')};
  }

  ${props =>
    props.skipbutton &&
    css`
      background: #222222;
      height: 56px;
      border-radius: 10px;
      border: 0;
      padding: 0 16px;
      color: #ff6f60;
      width: 100%;
      font-weight: 500;
      margin-top: 16px;
      transition: background-color 0.2s;
      border: 1px solid #ff6f60;

      &:hover {
        background: ${shade(0.2, '#222222')};
      }
    `}
`;

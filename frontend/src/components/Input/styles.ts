import { shade } from 'polished';
import styled, { css } from 'styled-components';

import ToolTip from '../ToolTip';

interface IContainerProps {
  isErrored: boolean;
}

export const Container = styled.div<IContainerProps>`
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@700&display=swap');

  background: ${shade(0.5, '#383838')};
  border-radius: 10px;
  padding: 16px;
  height: 57px;
  width: 100%;

  border: 2px solid #585858;
  color: #f4ede8;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #f4ede8;

    &::placeholder {
      color: #666360;
    }
  }

  svg {
    margin-right: 13px;
    margin-bottom: 2px;
  }
`;
export const Error = styled(ToolTip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;

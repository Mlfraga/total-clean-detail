import styled from 'styled-components'
import { shade } from 'polished';

export const Container = styled.div`
@import url('https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@700&display=swap');

    background: ${shade(0.5, '#383838')};
    border-radius: 10px;
    padding: 16px;
    height: 57px;
    width: 100%;

    border: 2px solid ${shade(0.5, '#383838')};
    color: #F4EDE8;

    display: flex;
    align-items: center;

    & + div{
      margin-top: 8px;
    }

    input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #F4EDE8;

    &::placeholder {
      color: #666360;
      }
    }

    svg {
      margin-right: 13px;
      margin-bottom: 2px;
    }
`

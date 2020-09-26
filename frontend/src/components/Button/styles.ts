import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
@import url('https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@700&display=swap');

  background: #ff6659;
  height: 56px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  color: #312e38;
  width: 100%;
  font-weight: 500;
  margin-top: 16px;
  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.2, '#ff6659')};
    }

 `

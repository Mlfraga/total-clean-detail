import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  skipButton?: boolean;
}

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <Container skipbutton={!!props.skipButton} type={props.type}>
      {props.children}
    </Container >
  )
}

export default Button;

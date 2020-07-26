import React from 'react';

import { Container } from './styles';

interface ButtonProps {
  text: string;
  buttonType: "button" | "submit" | "reset" | undefined;
}

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <Container type={props.buttonType}>{props.text}</Container>
  )
}

export default Button;

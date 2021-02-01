import React, { ButtonHTMLAttributes } from 'react';

import { Button as ChakraButton } from '@chakra-ui/core';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  skipButton?: boolean;
}

const Button: React.FC<IButtonProps> = ({
  onClick,
  skipButton,
  type,
  children,
}) => (
  <ChakraButton
    backgroundColor={skipButton ? '#222222' : '#ff6659'}
    color={skipButton ? '#ff6659' : '#312e38'}
    height="56px"
    borderRadius="md"
    border={0}
    padding="0 16px"
    fontSize="18px"
    width="100%"
    fontWeight="bold"
    marginTop="16px"
    _hover={{
      bg: '#df7468',
    }}
    _focusWithin={{
      border: 0,
    }}
    onClick={onClick}
    type={type}
  >
    {children}
  </ChakraButton>
);

export default Button;

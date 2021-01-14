import React, { useEffect, useRef, useState, useCallback } from 'react';

import {
  Select as ChakraSelect,
  SelectProps as ChakraSelectProps,
  PseudoBoxProps as ChakraPseudoBoxProps,
} from '@chakra-ui/core';
import { useField } from '@unform/core';

import { Container } from './styles';

interface ISelectProps extends ChakraSelectProps {
  name: string;
  containerProps?: ChakraPseudoBoxProps;
}

const ReactSelect: React.FC<ISelectProps> = ({
  name,
  children,
  containerProps,
  ...rest
}) => {
  const selectRef = useRef<HTMLSelectElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const { fieldName, defaultValue, error, registerField } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!selectRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container
      isFocused={isFocused}
      isFilled={isFilled}
      isErrored={!!error}
      width="100%"
      height={12}
      borderRadius="md"
      paddingLeft={4}
      {...containerProps}
      onClick={() => {
        selectRef.current?.focus();
      }}
    >
      <ChakraSelect
        defaultValue={defaultValue}
        bg="green.50"
        border={0}
        focusBorderColor="none"
        paddingLeft={0}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        ref={selectRef}
        {...rest}
      >
        {children}
      </ChakraSelect>
    </Container>
  );
};

export default ReactSelect;

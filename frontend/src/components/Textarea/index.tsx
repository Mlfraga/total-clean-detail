import React, { useEffect, useRef } from 'react';

import { Textarea } from '@chakra-ui/core';
import { useField } from '@unform/core';

interface ITextareaProps {
  name: string;
}

const ITextarea: React.FC<ITextareaProps> = ({ name }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { fieldName, error, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: textareaRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Textarea
      ref={textareaRef}
      background="#424242"
      borderWidth="2px"
      borderColor={error ? '#c53030' : '#585858'}
      color="#fff"
      name={name}
      resize="none"
      placeholder="Observações"
      _hover={{ borderWidth: '2px', borderColor: '#585858' }}
      _focus={{
        borderWidth: '2px',
        borderColor: '#585858',
      }}
    />
  );
};

export default ITextarea;

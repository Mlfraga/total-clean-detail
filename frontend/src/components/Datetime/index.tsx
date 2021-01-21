import React, {
  useEffect,
  useRef,
  useCallback,
  useState,
  ChangeEvent,
} from 'react';

import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import { useField } from '@unform/core';

import { Container } from './styles';

type IDateTimeProps = TextFieldProps & {
  name: string;
};

const DateTime: React.FC<IDateTimeProps> = ({ name }) => {
  const dateTimeRef = useRef<HTMLDivElement>(null);
  const { fieldName, error, registerField } = useField(name);
  const [dateValue, setDateValue] = useState<{ value: string }>({ value: '' });

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: dateValue,
      path: 'value',
    });
  }, [fieldName, dateValue, registerField]);

  const handleAvailabilityChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setDateValue({ value: event.target.value });
    },
    [setDateValue],
  );

  return (
    <Container isErrored={!!error}>
      <TextField
        ref={dateTimeRef}
        onChange={handleAvailabilityChange}
        id="date-times"
        type="datetime-local"
        className="date-times"
        value={dateValue.value}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </Container>
  );
};

export default DateTime;

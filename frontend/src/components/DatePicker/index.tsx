import React, { useEffect, useRef, useState } from 'react';
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';

import { PseudoBoxProps as ChakraPseudoBoxProps } from '@chakra-ui/core';
import { useField } from '@unform/core';

import { Container } from './styles';
import formatWeekDay from './utils/formatWeekDay';

interface IDatePickerProps extends Omit<ReactDatePickerProps, 'onChange'> {
  name: string;
  onChange?: (
    date: Date | [Date, Date] | null,
    event: React.SyntheticEvent<any> | undefined,
  ) => void;
  containerProps?: ChakraPseudoBoxProps;
  initialDate?: Date;
}
const DatePicker: React.FC<IDatePickerProps> = ({
  name,
  containerProps,
  initialDate,
  ...rest
}) => {
  const datePickerRef = useRef<ReactDatePicker>(null);

  const { fieldName, defaultValue, error, registerField } = useField(name);

  const [selected, setSelected] = useState(defaultValue);

  useEffect(() => {
    setSelected(initialDate);
  }, [initialDate]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: datePickerRef.current,
      path: 'props.selected',
      clearValue() {
        setSelected('');
      },
      setValue(ref, value) {
        setSelected(value);
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container borderRadius="md" isErrored={!!error} {...containerProps}>
      <ReactDatePicker
        ref={datePickerRef}
        selected={selected}
        showPopperArrow={false}
        dateFormat="dd/MM/yyyy"
        formatWeekDay={formatWeekDay}
        placeholderText="Data"
        onChange={date => {
          setSelected(date);
        }}
        {...rest}
      />
    </Container>
  );
};

export default DatePicker;

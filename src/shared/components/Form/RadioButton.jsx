import React, { useRef } from 'react';
import styled from 'styled-components';
import { randomId } from '@helpers';
import Button from '../Button';
import Input from '../Input';
import Label from '../Label';

const Radio = styled(Input).attrs({
  type: 'radio',
})`
  display: none;

  &:checked + label {
    color: #ffffff;
    font-weight: bold;
    border: solid 1px ${(props) => props.theme.colors.buyersguideGreen};
    background-color: ${(props) => props.theme.colors.buyersguideGreen};
  }
`;

const StyledButton = styled(Button).attrs({
  font: 's',
  color: 'anthrazit',
  border: 'solid 1px',
  borderColor: 'middleGrey',
})`
  padding: 8px 16px;
  border-radius: 3px;
  background-color: #ffffff;
`;

export default React.forwardRef(({ name, value, ...props }, ref) => {
  const { current: id } = useRef(randomId());

  return (
    <>
      <Radio ref={ref} id={id} name={name} value={value} />
      <StyledButton as={Label} htmlFor={id} {...props} />
    </>
  );
});

import React, { useRef } from 'react';
import styled from 'styled-components';
import { Box, Form, Text } from '@shared/components';
import { randomId } from '@helpers';
import { Label } from './shared';

const Input = styled(Form.Input).attrs({
  type: 'text',
})`
  width: 100%;
  border: 1px solid ${(props) => (props.error ? props.theme.colors.red : props.theme.colors.middleGrey)};

  &:focus {
    border: 1px solid ${(props) => (props.error ? props.theme.colors.red : props.theme.colors.anthrazit)};
  }
`;

const StyledTextarea = styled(Input).attrs({ as: Form.Textarea })`
  display: block;
  height: 120px;
  padding: 6px 12px;
`;

export default React.forwardRef(({ name, label, error, infoText, isTextarea, ...props }, ref) => {
  const id = useRef(randomId());

  return (
    <Box {...props}>
      <Label htmlFor={id.current}>{label}</Label>
      <Input as={isTextarea ? StyledTextarea : undefined} ref={ref} id={id.current} name={name} error={error} />

      {error && (
        <Text mt="1" font="xs" color="red">
          {error.message}
        </Text>
      )}
      {infoText && (
        <Text mt="1" font="xs">
          {infoText}
        </Text>
      )}
    </Box>
  );
});

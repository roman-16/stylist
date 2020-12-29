import React from 'react';
import styled from 'styled-components';
import { randomId } from '@helpers';
import { Basic, Box, Flex, Label, Span } from '@shared/components';

const forId = randomId();
const randomName = randomId();

const Radios = styled(Flex)`
  justify-content: space-between;
  ${(props) => props.disabled && 'cursor: not-allowed;'}
`;

export default ({ translations, onChange, disabled, ...props }) => (
  <Box {...props} font="s">
    <Radios disabled={disabled}>
      {Array(10)
        .fill(null)
        .map((el, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <Flex key={i} flexDirection="column" alignItems="center">
            <Label htmlFor={`${forId}-${i}`} mb="2">
              {i + 1}
            </Label>
            <Basic.Radio
              id={`${forId}-${i}`}
              disabled={disabled}
              required
              name={randomName}
              onChange={() => onChange(i + 1)}
            />
          </Flex>
        ))}
    </Radios>
    <Flex justifyContent="space-between" mt="2">
      <Span>{translations.notPleased}</Span>
      <Span>{translations.veryPleased}</Span>
    </Flex>
  </Box>
);

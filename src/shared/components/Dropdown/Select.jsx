import React from 'react';
import styled from '@/astyle';
import Flex from '../Flex';
import Select from '../Select';

const Wrapper = styled(Flex, {
  position: 'relative',
  alignItems: 'center',
  border: '1px solid $anthrazit',

  '&::after': {
    position: 'absolute',
    right: '0',
    marginRight: 4,
    transform: 'rotate(90deg)',
    fontSize: '24px',
    pointerEvents: 'none',
    // Use this symbol because it's easier to center
    content: "'▸'",
  },
});

const StyledSelect = styled(Select, {
  padding: '6px 16px',
  // To give the arrow more space
  paddingRight: '42px',
  height: '100%',
  minHeight: '40px',
  width: '100%',
  border: 'unset',
  outline: 'unset',
  fontWeight: 'bold',
  fontSize: '11px',
  color: '$anthrazit',
  textOverflow: '$ellipsis',

  $medium: {
    fontSize: '13px',
  },
}).attrs({
  appearance: 'none',
});

export default ({ css, ...props }) => (
  <Wrapper css={css}>
    <StyledSelect {...props} />
  </Wrapper>
);

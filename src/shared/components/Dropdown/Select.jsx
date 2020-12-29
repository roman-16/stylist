import React from 'react';
import styled from 'styled-components';
import Flex from '../Flex';
import Select from '../Select';

const Wrapper = styled(Flex)`
  /* to position the arrow */
  position: relative;
  align-items: center;

  border: 1px solid #333333;

  /* Add arrow */
  &::after {
    position: absolute;
    right: 0;
    margin-right: 16px;
    transform: rotate(90deg);
    font-size: 24px;
    pointer-events: none;
    /* Use this symbol because it's easier to center */
    content: '▸';
  }
`;

const StyledSelect = styled(Select).attrs({
  appearance: 'none',
  color: 'anthrazit',
  textOverflow: true,
})`
  padding: 6px 16px;
  padding-right: 42px; /* To give the arrow more space */
  height: 100%;
  min-height: 40px;
  width: 100%;
  border: unset;
  outline: unset;
  font-weight: bold;
  font-size: 11px;
  ${(props) => props.theme.mediaQueries.medium} {
    font-size: 13px;
  }
`;

export default ({ maxWidth, ...props }) => (
  <Wrapper maxWidth={maxWidth}>
    <StyledSelect {...props} />
  </Wrapper>
);

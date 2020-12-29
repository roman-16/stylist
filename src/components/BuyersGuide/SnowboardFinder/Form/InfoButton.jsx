import React from 'react';
import styled from 'styled-components';
import { Button, Image } from '@shared/components';

const StyledSvg = styled(Image).attrs({
  src: '/svg/checkout/help2.svg',
})`
  position: relative;
  top: 2px;
  height: 15px;
  width: 15px;
  border-radius: 50%;
  margin-left: 8px;
`;

export default ({ onClick, ...props }) => (
  <Button
    type="button"
    onClick={(event) => {
      event.preventDefault();
      onClick?.();
    }}
    {...props}
  >
    <StyledSvg />
  </Button>
);

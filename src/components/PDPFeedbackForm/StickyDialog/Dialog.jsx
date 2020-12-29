import React from 'react';
import { Box, Button, Image } from '@shared/components';
import { baseURL } from '@helpers';
import styled from 'styled-components';

const CloseButton = styled(Button)`
  height: 18px;
  width: 18px;
  position: absolute;
  top: 3px;
  right: 3px;
  padding: 4px;
`;

export default ({ onClose, children, ...props }) => (
  <Box backgroundColor="white" {...props}>
    <CloseButton onClick={() => onClose && onClose()}>
      <Image src={baseURL.getPathname('/svg/icon-x-medium.svg')} alt="Close icon" verticalAlign="top" />
    </CloseButton>
    <div>{children}</div>
  </Box>
);

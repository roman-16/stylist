import React from 'react';
import styled from 'styled-components';
import { baseURL } from '@helpers';
import { Box, Image } from '@shared/components';

const Logo = styled(Image)`
  height: 100%;
`;

export default ({ ...props }) => (
  <Box height="7" width="184px" {...props}>
    <Logo
      src={baseURL.getPathname('/custom/images/blueworld/logo.png')}
      srcSet={`${baseURL.getPathname('/custom/images/blueworld/logo@x2.png')} 2x`}
      alt="Blue World Logo"
      aspectRatio={{ width: 184, height: 48 }}
    />
  </Box>
);

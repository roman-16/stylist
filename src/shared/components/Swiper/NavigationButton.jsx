import React from 'react';
import styled from '@/astyle';
import { baseURL } from '@helpers';
import { Button, Image } from '@shared/components';

const NavigationButton = styled(Button, {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '25px',
  width: '25px',
  borderRadius: '100%',
  backgroundColor: 'white',

  // Center the arrow
  paddingLeft: '2px',
});

export default ({ alt, ...props }) => (
  <NavigationButton {...props}>
    <Image
      css={{ display: 'block', height: '15px' }}
      src={baseURL.getPathname('svg/icon-breadcrumb-arrow.svg')}
      alt={alt}
    />
  </NavigationButton>
);

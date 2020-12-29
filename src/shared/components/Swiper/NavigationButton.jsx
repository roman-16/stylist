import React from 'react';
import styled from 'styled-components';
import { baseURL } from '@helpers';
import { Button, Image } from '@shared/components';

const NavigationButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 25px;
  width: 25px;
  border-radius: 100%;
  background-color: white;

  /* Center the arrow */
  padding-left: 2px;
`;

export default ({ alt, ...props }) => (
  <NavigationButton {...props}>
    <Image display="block" height="15px" src={baseURL.getPathname('svg/icon-breadcrumb-arrow.svg')} alt={alt} />
  </NavigationButton>
);

import React from 'react';
import styled from 'styled-components';
import { baseURL } from '@helpers';
import { Flex, Image } from '@shared/components';

const Icon = styled(Image)`
  width: 100%;
`;

export default ({ ...props }) => (
  <Flex {...props}>
    <Icon src={baseURL.getPathname('/svg/icon-search-blue.svg')} alt="Search Icon" />
  </Flex>
);

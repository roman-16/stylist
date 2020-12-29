import React from 'react';
import styled from 'styled-components';
import { Heading } from '@shared/components';

const Title = styled(Heading.H4)`
  font-size: 20px;
  line-height: 27px;
  font-weight: bold;
  text-align: center;
`;

export default ({ marginBottom, ...props }) => <Title {...props}>Shop Your Style</Title>;

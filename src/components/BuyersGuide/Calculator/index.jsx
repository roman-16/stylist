import React from 'react';
import { Container, Text } from '@shared/components';
import Form from './Form';

export default ({ data, ...props }) => (
  <Container {...props}>
    <Text css={{ font: '$xl', color: '$buyersguideGreen' }}>{data.title}</Text>
    <Text css={{ mb: 4, font: '$xl', fontWeight: '700', color: '$anthrazit' }}>{data.subtitle}</Text>

    <Form css={{ maxWidth: '400px' }} data={data} />
  </Container>
);

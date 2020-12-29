import React from 'react';
import { Container, Text } from '@shared/components';
import Form from './Form';

export default ({ data, ...props }) => (
  <Container {...props}>
    <Text font="xl" color="buyersguideGreen">
      {data.title}
    </Text>
    <Text mb="4" font="xl" fontWeight="700" color="anthrazit">
      {data.subtitle}
    </Text>

    <Form data={data} maxWidth="400px" />
  </Container>
);

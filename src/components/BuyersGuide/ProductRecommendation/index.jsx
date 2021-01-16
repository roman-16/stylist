import React, { useState } from 'react';
import styled from '@/astyle';
import { useQuery } from '@apollo/client';
import { A, Container, Dropdown, Flex, Product, Swiper, useSwiper } from '@shared/components';
import { useContext, useMediaQuery } from '@shared/hooks';
import graphqlQuery from './query.graphql';

const Button = styled(A, {
  py: 3,
  px: 6,
  font: '$m',
  textAlign: 'center',
  fontWeight: 'bold',
  color: '#ffffff',
  bg: '$orange',

  '&:hover, &:focus, &:visited': {
    color: '#ffffff',
  },
}).attrs({
  type: 'nav',
});

export default ({ data, onNoProduct, ...props }) => {
  const isArray = Array.isArray(data);
  const { gender: initialGender } = useContext();
  const [entry, setEntry] = useState(isArray ? data.find(({ gender }) => gender === initialGender) ?? data[0] : data);
  const { loading, error, data: response } = useQuery(graphqlQuery, {
    variables: { fredhopperUri: entry.query },
  });
  const isMedium = useMediaQuery('medium');
  const { swiperProps } = useSwiper({
    navigation: {
      enabled: isMedium,
      step: 2,
    },
    justifyContent: 'center',
  });

  if ((loading || error) && !response) return null;

  if (response.products.nodes.length <= 0) {
    onNoProduct?.();
  }

  return (
    <Container {...props}>
      {isArray && (
        <Dropdown
          css={{
            maxWidth: '256px',
          }}
          values={data.map((_entry) => ({
            value: _entry.query,
            text: _entry.title,
          }))}
          defaultValue={entry.query}
          onChange={(newQuery) => setEntry(data.find(({ query }) => query === newQuery))}
        />
      )}
      <Swiper {...swiperProps} mt="6">
        {response.products.nodes.map((product, i) => {
          const analyticsProps = {
            'data-label': product.meta.code,
            'data-position': i,
          };
          const width = {
            _: '40%',
            medium: '20%',
          };

          // Set min- and max-width to the same value, which fixes a bug when not enough products are shown
          return <Product key={product.id} product={product} minWidth={width} maxWidth={width} {...analyticsProps} />;
        })}
      </Swiper>
      <Flex css={{ justifyContent: 'center', mt: 6 }}>
        <Button href={entry.button.url}>{entry.button.text}</Button>
      </Flex>
    </Container>
  );
};

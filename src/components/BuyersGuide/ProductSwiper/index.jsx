import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useLazyQuery } from '@apollo/client';
import { Container, Heading, Product, Swiper, useSwiper } from '@shared/components';
import { useMediaQuery } from '@shared/hooks';
import { BuyersGuideProductSwiperFredhoppperUri, BuyersGuideProductSwiperIds } from './query.graphql';

const StyledProduct = styled(Product)`
  min-width: 36%;
  width: 36%;
  margin-right: 16px;

  &:last-child {
    margin-right: unset;
  }

  ${(props) => props.theme.mediaQueries.medium} {
    min-width: 15%;
    width: 15%;
    margin-right: 32px;
  }
`;

const useProducts = ({ data, fredhopperUri, ids }) => {
  const [loadProducts, { data: response }] = useLazyQuery(
    fredhopperUri ? BuyersGuideProductSwiperFredhoppperUri : BuyersGuideProductSwiperIds,
    { variables: fredhopperUri ? { fredhopperUri } : { ids } },
  );

  useEffect(() => {
    if (!data) loadProducts();
  }, [data, loadProducts]);

  if (data) return data;

  return response?.products.nodes;
};

export default ({ title, data, fredhopperUri, ids, ...props }) => {
  const products = useProducts({ data, fredhopperUri, ids });
  const isMedium = useMediaQuery('medium');
  const { swiperProps } = useSwiper({
    navigation: { enabled: isMedium },
    justifyContent: 'center',
  });

  if (!products) return null;

  return (
    <Container {...props}>
      {title && (
        <Heading.H3 mb="6" font="l" fontWeight="700" textAlign="center">
          {title}
        </Heading.H3>
      )}
      <Swiper {...swiperProps}>
        {products.map((product, i) => {
          const analyticsProps = {
            'data-label': product.meta.code,
            'data-position': i,
          };

          return <StyledProduct key={product.id} product={product} {...analyticsProps} />;
        })}
      </Swiper>
    </Container>
  );
};

import React from 'react';
import styled from 'styled-components';
import { useMediaQuery } from '@shared/hooks';
import { Swiper, useSwiper } from '@shared/components';
import Product from './shared/Product';

const StyledProduct = styled(Product)`
  min-width: 80%;

  ${(props) => props.theme.mediaQueries.medium} {
    min-width: 100%;
  }
`;

export default ({ product, analyticsProps, ...props }) => {
  const isMedium = useMediaQuery('medium');
  const { swiperProps, next } = useSwiper({
    navigation: {
      enabled: isMedium,
      start: 1,
    },
  });

  return (
    <Swiper offsetAfter={isMedium ? undefined : '10px'} {...swiperProps} {...props}>
      <StyledProduct {...analyticsProps} product={product} isSoldOut onSimilarClick={() => next()} />

      {product.similarProducts.nodes.map((similarProduct) => (
        <StyledProduct
          key={similarProduct.id}
          product={similarProduct}
          isSimilar
          isBuyable
          // Add margin on mobile
          ml={{ _: '10px', medium: 'unset' }}
        />
      ))}
    </Swiper>
  );
};

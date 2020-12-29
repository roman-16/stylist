import React from 'react';
import styled from 'styled-components';
import { useContext } from '@shared/hooks';
import { Box } from '@shared/components';
import Product from './shared/Product';
import SimilarProductsSwiper from './SimilarProductsSwiper';

const ProductWrapper = styled(Box)`
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: unset;
  }

  ${(props) => props.theme.mediaQueries.medium} {
    margin-bottom: unset;
    padding: 15px 0;
    border-bottom: 1px solid #eaeaea;

    &:first-child {
      padding-top: unset;
    }

    &:last-child {
      padding-bottom: unset;
      border-bottom: unset;
    }
  }
`;

export default ({ products, ...props }) => {
  const { api } = useContext();

  return (
    <Box {...props}>
      {products.map((product, i) => {
        const analyticsProps = {
          'data-label': `sys-${api.dataLayer.sysdp.id}`,
          'data-position': i + 1,
        };

        return (
          <ProductWrapper key={product.id}>
            {product.inStock ? (
              <Product {...analyticsProps} product={product} isBuyable />
            ) : (
              <SimilarProductsSwiper
                // Removes the grey border on the right side to indicate that this is swipeable
                mr={{ _: '-10px', medium: 'unset' }}
                analyticsProps={analyticsProps}
                product={product}
              />
            )}
          </ProductWrapper>
        );
      })}
    </Box>
  );
};

import React from 'react';
import styled from 'styled-components';
import { Box, Flex, Product } from '@shared/components';
import { hoverAnimation } from '@shared/animations';
import { StyleImage, ShopYourStyleTitle } from '../shared';

const StyledShopYourStyleTitle = styled(ShopYourStyleTitle)`
  margin-bottom: 10px;
  text-align: left;
`;

const StyledStyleImage = styled(StyleImage)`
  ${hoverAnimation}
`;

const StyledProduct = styled(Product)`
  ${hoverAnimation}

  margin-right: 25px;
  width: 100px;

  &:last-child {
    margin-right: unset;
  }

  ${(props) => props.theme.mediaQueries.large} {
    width: 140px;
  }
  ${(props) => props.theme.mediaQueries.xlarge} {
    width: 170px;
  }
`;

export default ({ style, ...props }) => (
  <Flex mx="10px" py={style.headline ? '32px' : '0'} {...props}>
    <Box width="30%" mr="25px">
      <StyledStyleImage
        src={{
          src: style.images[0].image,
          preset: 'pdtx2',
          width: 340,
          height: 454,
          align: '0,-1',
        }}
        style={style}
        width="100%"
      />
    </Box>

    <Flex flexDirection="column" justifyContent="center">
      <StyledShopYourStyleTitle />
      <Flex>
        {style.products.nodes
          .map((product, i) => (
            <StyledProduct
              key={product.id}
              product={product}
              data-label={`sys-${style.id}`}
              data-position={i + 1}
              image={{
                src: { width: 740, height: 986 },
                aspectRatio: { width: 740, height: 986 },
              }}
            />
          ))
          .slice(0, 4)}
      </Flex>
    </Flex>
  </Flex>
);

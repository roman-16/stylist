import React from 'react';
import styled from 'styled-components';
import { Box, Product, Flex, Swiper } from '@shared/components';
import { StyleImage, ShopYourStyleTitle } from '../shared';

const Container = styled(Flex)`
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export default ({ style, ...props }) => (
  <Container {...props}>
    <ShopYourStyleTitle mb="5px" />
    <StyleImage
      src={{
        src: style.images[0].image,
        preset: 'pdtx2',
        width: 452,
        height: 712,
        align: '0,-1',
      }}
      style={style}
      width="75%"
      mb="10px"
    />
    {/* Removes the blue border on the right side to indicate that this is swipeable */}
    <Swiper offsetAfter="10px" mx={{ _: '-10px', medium: 'unset' }}>
      {style.products.nodes
        .map((product, i) => (
          // Box is needed here to let CompactProduct it's own width
          <Box key={product.id} ml="10px" minWidth="130px">
            <Product
              product={product}
              data-label={`sys-${style.id}`}
              data-position={i + 1}
              image={{
                src: { width: 530, height: 708 },
                aspectRatio: { width: 530, height: 708 },
              }}
            />
          </Box>
        ))
        .slice(0, 4)}
    </Swiper>
  </Container>
);

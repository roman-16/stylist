import React from 'react';
import styled from 'styled-components';
import { Box, Flex, Product } from '@shared/components';
import { hoverAnimation } from '@shared/animations';
import { StyleImage } from '../shared';

const Grid = styled(Box)`
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 50% repeat(2, minmax(0, 20%));
  grid-template-areas: 'main side-1 side-2';
  grid-column-gap: 50px;

  ${(props) => props.theme.mediaQueries.xlarge} {
    grid-template-columns: 36% repeat(2, minmax(0, 15%));
    grid-template-areas: 'main side-1 side-2';
    justify-content: center;
  }
`;

const MainArea = styled(Box)`
  grid-area: main;
`;

const Side1Area = styled(Flex)`
  grid-area: side-1;
  flex-direction: column;
  justify-content: space-between;
`;

const Side2Area = styled(Flex)`
  grid-area: side-2;
  flex-direction: column;
  justify-content: ${(props) => (props.spaceAround ? 'space-around' : 'space-between')};
`;

const StyledStyleImage = styled(StyleImage)`
  ${hoverAnimation}
`;

const StyledProduct = styled(Product)`
  ${hoverAnimation}

  margin-bottom: 20px;

  &:last-child {
    margin-bottom: unset;
  }
`;

export default ({ style, ...props }) => {
  const products = style.products.nodes.map((product, i) => ({ position: i, ...product }));
  const productComponents = {
    side1Area: products.filter((product, i) => i % 2 === 0),
    side2Area: products.filter((product, i) => i % 2 !== 0),
  };

  return (
    <Grid {...props}>
      <MainArea>
        <StyledStyleImage
          src={{
            src: style.images[0].image,
            preset: 'pdtx2',
            width: 908,
            height: 1208,
            align: '0,-1',
          }}
          style={style}
        />
        {/* Space- main img ends with product img */}
        <Box height={style.headline ? '48px' : '78px'} />
      </MainArea>
      <Side1Area>
        {productComponents.side1Area
          .map((product) => (
            <StyledProduct
              key={product.id}
              product={product}
              data-label={`sys-${style.id}`}
              data-position={product.position + 1}
              image={{
                src: { width: 378, height: 504 },
                aspectRatio: { width: 378, height: 504 },
              }}
            />
          ))
          .slice(0, 2)}
      </Side1Area>
      <Side2Area spaceAround={productComponents.side2Area.length <= 1 && productComponents.side1Area.length > 1}>
        {productComponents.side2Area
          .map((product) => (
            <StyledProduct
              key={product.id}
              product={product}
              data-label={`sys-${style.id}`}
              data-position={product.position + 1}
              image={{
                src: { width: 378, height: 504 },
                aspectRatio: { width: 378, height: 504 },
              }}
            />
          ))
          .slice(0, 2)}
      </Side2Area>
    </Grid>
  );
};

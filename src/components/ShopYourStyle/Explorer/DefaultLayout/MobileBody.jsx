import React from 'react';
import styled from 'styled-components';
import { Box, CompactProduct } from '@shared/components';
import { StyleImage } from '../shared';

const StyledProduct = styled(CompactProduct)`
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: unset;
  }
`;

export default ({ style, ...props }) => (
  // width 100% so textOverflow works on StyleHeadline
  <Box width="100%" {...props}>
    <StyleImage
      src={{
        src: style.images[0].image,
        preset: 'pdtx2',
        width: 710,
        height: 946,
        align: '0,-1',
      }}
      style={style}
      mb="10px"
    />
    {style.products.nodes
      .map((product, i) => (
        <StyledProduct key={product.id} product={product} data-label={`sys-${style.id}`} data-position={i + 1} />
      ))
      .slice(0, 4)}
  </Box>
);

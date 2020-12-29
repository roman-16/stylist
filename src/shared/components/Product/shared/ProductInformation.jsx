import React from 'react';
import styled from 'styled-components';
import Box from '../../Box';
import Text from '../../Text';
import Span from '../../Span';

const StyledText = styled(Text).attrs({
  textOverflow: true,
  font: 's',
  fontSize: { _: '12px', medium: '13px' },
})``;

const RegularPrice = styled(Span)`
  text-decoration: line-through;
  margin-right: 6px;
`;

export default ({ product, textAlign, ...props }) => {
  const { isDiscountPrice } = product.minPrice;

  return (
    <Box width="100%" {...props}>
      <StyledText textAlign={textAlign} fontWeight="bold">
        {product.brand}
      </StyledText>
      <StyledText textAlign={textAlign}>{product.name}</StyledText>

      {product.color && <StyledText textAlign={textAlign}>{product.color}</StyledText>}

      <StyledText textAlign={textAlign} font="h-s" fontFamily="'Open Sans Condensed'" letterSpacing="0.5px">
        {product.minPrice.isDiscountPrice && <RegularPrice>{product.minPrice.regularPriceLocalDisplay}</RegularPrice>}
        <Span fontWeight="bold" color={isDiscountPrice ? '#ff6600' : '#333'}>
          {product.minPrice.priceLocalDisplay}
        </Span>
      </StyledText>
    </Box>
  );
};

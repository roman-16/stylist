import React from 'react';
import styled from 'styled-components';
import { useTranslations, useMediaQuery } from '@shared/hooks';
import Flex from '../../Flex';
import Text from '../../Text';
import { ProductInformation } from '../shared';
import { SoldText } from './shared';
import AWrapper from './AWrapper';
import Image from './Image';
import { AddToCartButton, SimilarProductsButton } from './Buttons';

// const AddToWishlistIcon = styled(Image).attrs({
//   src: '/svg/icon-heart-filled.svg',
// })`
//   height: 15px;
//   filter: opacity(0.3);
//   ${(props) => props.theme.mediaQueries.medium} {
//     height: 24px;
//     width: 28px;
//   }
// `;

// const AddToWishlistIconContainer = styled(Button)`
//   position: absolute;
//   right: 10px;
// `;

const SimilarProductsFlag = styled(Text)`
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 0px 5px;
  z-index: 10;
  background-color: #c3edf9;
  font-weight: bold;
  font-size: 10px;
  line-height: 20px;

  ${(props) => props.theme.mediaQueries.medium} {
    font-size: 12px;
    padding: 0 8px;
  }
`;

export default ({
  product,
  isBuyable,
  isSoldOut,
  isSimilar,
  textAlign,
  image: { width, ...imageProps } = {},
  onSimilarClick,
  ...props
}) => {
  const { translations } = useTranslations('shopTheLook');
  const isMedium = useMediaQuery('medium');
  const isButton = isBuyable || isSoldOut;

  return (
    <Flex p="10px" bg="white" {...props}>
      <AWrapper position="relative" product={product} minWidth={width ?? '26%'}>
        <Image product={product} isSoldOut={isSoldOut} imageProps={imageProps} />
        {isSimilar && <SimilarProductsFlag>{translations.similar}</SimilarProductsFlag>}
      </AWrapper>

      {/* min-width and max-width to trigger text overflow */}
      <Flex
        flexDirection="column"
        justifyContent={isButton ? undefined : 'center'}
        minWidth="0"
        maxWidth="260px"
        width="100%"
        ml={{ _: '10px', medium: '20px' }}
      >
        <AWrapper product={product}>
          <ProductInformation product={product} textAlign={textAlign} />
        </AWrapper>

        {isSoldOut &&
          (isMedium ? (
            <SimilarProductsButton mt="20px" onClick={onSimilarClick} />
          ) : (
            <SoldText>{translations.soldOut}</SoldText>
          ))}
        {isBuyable && <AddToCartButton mt="6px" product={product} />}
      </Flex>
    </Flex>
  );
};

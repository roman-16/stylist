import React from 'react';
import styled from 'styled-components';
import { useTranslations, useMediaQuery } from '@shared/hooks';
import Box from '../../Box';
import Image from '../../Image';
import { SoldText } from './shared';

const SoldTextWrapper = styled(Box)`
  position: absolute;
  align-self: center;
  width: 100%;
  text-align: center;
`;

export default ({ product, isSoldOut, imageProps, ...props }) => {
  const { translations } = useTranslations('shopTheLook');
  const isMedium = useMediaQuery('medium');

  return (
    // position and display to center the sold out text
    <Box position="relative" display="flex" {...props}>
      <Image
        aspectRatio={{ width: 200, height: 268 }}
        alt={product.name}
        width="100%"
        opacity={isSoldOut ? '0.5' : undefined}
        {...imageProps}
        src={{
          src: product.image,
          preset: 'pdtx2',
          width: isMedium ? 390 : 200,
          height: isMedium ? 520 : 268,
          ...imageProps?.src,
        }}
      />
      {isSoldOut && isMedium && (
        <SoldTextWrapper>
          <SoldText>{translations.soldOut}</SoldText>
        </SoldTextWrapper>
      )}
    </Box>
  );
};

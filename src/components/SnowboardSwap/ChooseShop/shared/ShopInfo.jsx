import React from 'react';
import { Box, Span, Text } from '@shared/components';
import { useTranslations } from '@shared/hooks';

export default ({ shop, ...props }) => {
  const { translations } = useTranslations('snowboardSwap');

  return (
    <Box {...props}>
      <Text font="s" fontWeight="bold" textOverflow>
        {translations.blueTomatoShop}
        <Span color="blue"> {shop.shopName}</Span>
      </Text>
      <Text font="s">
        {shop.streetName} {shop.streetNumber}
      </Text>
      <Text font="s">
        {shop.zip} {shop.city}
      </Text>
    </Box>
  );
};

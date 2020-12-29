import React, { useRef } from 'react';
import styled from 'styled-components';
import { useTranslations } from '@shared/hooks';
import { Box, Flex, Label as RadioLabel, Radio, Text } from '@shared/components';
import { randomId } from '@helpers';
import { Label } from './shared';

const StyledRadio = styled(Radio)`
  margin-right: 8px;
`;

const StyledLabel = styled(Label)`
  margin-bottom: 8px; /* Needs to be here to overwrite the style in Label */
`;

export default ({ name, value, onChange, countryField, ...props }) => {
  const { translations } = useTranslations('snowboardSwap');
  const id = useRef(randomId());

  return (
    <Box {...props}>
      <StyledLabel>{translations.returnMethod}</StyledLabel>

      {countryField?.isocode !== 'CH' && (
        <Flex mb="3">
          <StyledRadio
            name={name}
            id={`shipping-${id.current}`}
            checked={value === 'shipping'}
            onChange={() => onChange('shipping')}
          />
          <RadioLabel
            htmlFor={`shipping-${id.current}`}
            font="s"
            fontWeight={value === 'shipping' ? 'bold' : undefined}
          >
            {translations.shipping}
            <Text font="xs">{translations.shippingInfo}</Text>
          </RadioLabel>
        </Flex>
      )}

      <Flex>
        <StyledRadio
          name={name}
          id={`shop-${id.current}`}
          checked={value === 'shop'}
          onChange={() => onChange('shop')}
        />
        <RadioLabel htmlFor={`shop-${id.current}`} font="s" fontWeight={value === 'shop' ? 'bold' : undefined}>
          {translations.shop}
        </RadioLabel>
      </Flex>
    </Box>
  );
};

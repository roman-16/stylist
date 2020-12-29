import React from 'react';
import styled from 'styled-components';
import { Box, Flex, Label, Overlay, Radio, Text } from '@shared/components';
import { useTranslations } from '@shared/hooks';
import { ShopInfo } from './shared';

const headerHeight = '45px';

const Header = styled(Flex).attrs({
  font: 'm',
  color: { _: 'anthrazit', small: 'white' },
  bg: { _: 'lightGrey', small: 'anthrazit' },
})`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: ${headerHeight};
`;

const StyledRadio = styled(Radio)`
  margin-right: 8px;
  margin-left: 24px;
`;

const StyledLabel = styled(Label)`
  display: flex;
  padding: 12px 0;
  border-bottom: 1px solid ${(props) => props.theme.colors.middleGrey};

  cursor: pointer;

  &:last-child {
    border-bottom: unset;
  }
`;

export default ({ name, value, onChange, sortedShops, countries, setIsOpen, ...props }) => {
  const { translations } = useTranslations('snowboardSwap');

  return (
    <Overlay {...props} setIsOpen={setIsOpen} closeSvgProps={{ fill: { small: 'white' } }}>
      <Header>{translations.shopSelection}</Header>

      <Box pt="4" height={`calc(100% - ${headerHeight})`} overflow="auto">
        {sortedShops.map((countryShops) => {
          const firstShop = countryShops[0];

          return (
            <Box key={firstShop.isocode}>
              <Text ml="5" font="m" fontWeight="bold">
                {translations.shopsIn} {countries.find((country) => country.isocode === firstShop.isocode).name}:
              </Text>

              {countryShops.map((shop) => (
                <StyledLabel key={shop.shopID}>
                  <StyledRadio
                    name={name}
                    value={shop.shopID}
                    checked={shop === value}
                    onChange={() => {
                      onChange(shop);
                      setIsOpen(false);
                    }}
                  />
                  {/* width to trigger textOverflow */}
                  <ShopInfo shop={shop} width="75%" />
                </StyledLabel>
              ))}
            </Box>
          );
        })}
      </Box>
    </Overlay>
  );
};

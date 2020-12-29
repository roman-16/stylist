import React, { useState } from 'react';
import styled from 'styled-components';
import { Box, Flex, Image, Text } from '@shared/components';
import { useTranslations } from '@shared/hooks';
import { baseURL } from '@helpers';
import { Button } from '../shared';
import { ShopInfo } from './shared';
import Overlay from './Overlay';

const Arrow = styled(Box)`
  position: absolute;
  top: -4px;
  left: 24px;
  width: 8px;
  height: 8px;
  transform: rotate(45deg);
  background-color: ${(props) => props.theme.colors.ultralightBlue};

  ${(props) => props.theme.mediaQueries.medium} {
    left: 8px;
  }
`;

const StyledText = styled(Text).attrs({ font: 's' })``;

const ChooseShopButton = styled(Button)`
  background-color: white;
  color: ${(props) => props.theme.colors.blue};
  border: 1px solid ${(props) => props.theme.colors.blue};

  &:hover {
    background-color: ${(props) => props.theme.colors.blue};
    color: white;
  }

  ${(props) => props.theme.mediaQueries.medium} {
    width: 40%;
  }
`;

export default ({ name, value, onChange, sortedShops, countries, ...props }) => {
  const { translations } = useTranslations('snowboardSwap');
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  return (
    <>
      <Overlay
        name={name}
        value={value}
        onChange={onChange}
        sortedShops={sortedShops}
        countries={countries}
        isOpen={isOverlayOpen}
        setIsOpen={setIsOverlayOpen}
      />

      <Box position="relative" p="8px 16px 16px" bg="ultralightBlue" {...props}>
        <Arrow />

        <StyledText mb="4">{translations.yourChosenShop}</StyledText>

        <Flex mb="4">
          <Box width="18px" mr="12px">
            <Image
              display="block"
              width="100%"
              src={baseURL.getPathname('/svg/footer/trust/stores.svg')}
              alt="Shop Icon"
            />
          </Box>
          {value && <ShopInfo shop={value} />}
        </Flex>

        <ChooseShopButton
          onClick={(event) => {
            event.preventDefault();
            setIsOverlayOpen(true);
          }}
        >
          {translations.chooseShop}
        </ChooseShopButton>
      </Box>
    </>
  );
};

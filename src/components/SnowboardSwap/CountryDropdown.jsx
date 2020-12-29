import React, { useRef } from 'react';
import styled from 'styled-components';
import { useTranslations } from '@shared/hooks';
import { Box, Dropdown, Flex, Image, Select, Tooltip, Span } from '@shared/components';
import { Label } from './shared';

const SelectWrapper = styled(Flex)`
  position: relative;
  justify-content: center;
  align-items: center;
`;

const StyledSelect = styled(Select).attrs({
  // To allow height change in safari
  appearance: 'none',
})`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;

  /* The font size doesn't do anything but prevent that safari zooms on click
     https://stackoverflow.com/a/6394497/5967068 */
  font-size: 16px;
`;

const StyledSpan = styled(Span)`
  text-decoration: underline;
  font-weight: bold;
  font-size: 13px;
`;

export default ({ name, value, onChange, countries, ...props }) => {
  const { translations } = useTranslations('snowboardSwap');
  const selectRef = useRef();

  return (
    <Box {...props}>
      <Label htmlFor="country">{translations.country}*</Label>

      <Flex alignItems="center">
        <Image
          src={`//static.blue-tomato.com/mobile/_ui/bto/flags/4x3/${value.isocode.toLowerCase()}.svg`}
          alt={value.name}
          width="18px"
          mr="3"
        />
        <Span>{value.name}</Span>
        <Dropdown
          CustomSelect={({ children, ...selectProps }) => (
            // TODO: Merge code with addToCart
            // Position absolute and with opacity to show a text
            // But when a click happens the select box will open
            <SelectWrapper>
              <StyledSpan textOverflow px="3">
                ({translations.changeCountry})
              </StyledSpan>

              <StyledSelect {...selectProps} ref={selectRef} id="country" defaultValue="default" name={name}>
                {/* Add option for title */}
                <option value="default" disabled hidden>
                  {translations.changeCountry}
                </option>

                {children}
              </StyledSelect>
            </SelectWrapper>
          )}
          values={countries.map((country) => ({
            value: country.isocode,
            text: country.name,
          }))}
          onChange={(isocode) => {
            selectRef.current.value = 'default';

            onChange?.(countries.find((country) => country.isocode === isocode));
          }}
        />
        <Tooltip tooltipProps={{ maxWidth: '300px' }} text={translations.tooltipCountries} />
      </Flex>
    </Box>
  );
};

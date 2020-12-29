import React, { useRef } from 'react';
import styled from 'styled-components';
import { useContext, useTranslations } from '@shared/hooks';
import Flex from '../../../Flex';
import Dropdown from '../../../Dropdown';
import Select from '../../../Select';
import Span from '../../../Span';
import { Button } from './shared';

const StyledButton = styled(Button).attrs({
  backgroundColor: 'orange',
})`
  color: white;
`;

const SelectWrapper = styled(StyledButton).attrs({
  as: Flex,
})`
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

export default ({ product, ...props }) => {
  const { api } = useContext();
  const { loading, translations } = useTranslations('shopTheLook');
  const selectRef = useRef();

  if (loading) return null;

  // Show simple button when only one size exists
  if (product.variants.nodes.length <= 1 && product.variants.sizes.length <= 0) {
    return (
      <StyledButton
        textOverflow
        onClick={() =>
          api.ajax.addToCart({
            productId: product.id,
            variantId: product.variants.nodes[0].id,
          })
        }
        {...props}
      >
        {translations.addToCart}
      </StyledButton>
    );
  }

  const soldOut = translations.soldOut.toLowerCase();

  return (
    <Dropdown
      CustomSelect={({ children, ...selectProps }) => (
        // TODO: Merge code with countryDropdown inn snowboard swap
        // Position absolute and with opacity to show a text
        // But when a click happens the select box will open
        <SelectWrapper {...props}>
          <Span textOverflow>{translations.addToCart}</Span>

          <StyledSelect ref={selectRef} {...selectProps} defaultValue="default">
            {/* Add option for title */}
            <option value="default" disabled>
              {translations.chooseYourSize}
            </option>

            {children}
          </StyledSelect>
        </SelectWrapper>
      )}
      values={
        product.variants.sizes.length <= 0
          ? product.variants.nodes.map((variant) => {
              const inStock = variant.stock > 0;
              const { size } = variant.sizes[0];
              const value = inStock ? size : `${size} (${soldOut})`;

              return {
                value: variant.id,
                text: value,
                disabled: !inStock,
              };
            })
          : product.variants.sizes.reduce(
              (acc, sizeValue) => ({
                ...acc,
                [sizeValue]: product.variants.nodes.map((variant) => {
                  const inStock = variant.stock > 0;
                  const { size } = variant.sizes.find((_size) => _size.name === sizeValue);

                  return {
                    value: variant.id,
                    text: inStock ? size : `${size} (${soldOut})`,
                    disabled: !inStock,
                  };
                }),
              }),
              {},
            )
      }
      onChange={(variantId) => {
        selectRef.current.value = 'default';

        api.ajax.addToCart({
          productId: product.id,
          variantId,
        });
      }}
    />
  );
};

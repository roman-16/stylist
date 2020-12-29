import React from 'react';
import styled from 'styled-components';
import { useTranslations } from '@shared/hooks';
import { Checkbox, Flex, Label, Text, Tooltip } from '@shared/components';

const StyledLabel = styled(Label).attrs({ font: 's' })`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export default ({ name, value, onChange, ...props }) => {
  const { translations } = useTranslations('snowboardSwap');

  return (
    <Flex {...props}>
      <StyledLabel mr="3">
        <Checkbox name={name} checked={value} onChange={() => onChange(!value)} mr="3" />
        <Text fontWeight={value ? 'bold' : undefined}>{translations.donate}</Text>
      </StyledLabel>

      <Tooltip tooltipProps={{ maxWidth: '300px' }} text={translations.tooltipDonate} />
    </Flex>
  );
};

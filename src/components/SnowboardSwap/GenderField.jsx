import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { useTranslations } from '@shared/hooks';
import { Flex, Label, Radio } from '@shared/components';
import { randomId } from '@helpers';

const StyledRadio = styled(Radio)`
  margin-right: 8px;
`;

export default ({ name, ...props }) => {
  const { translations } = useTranslations('snowboardSwap');
  const [isMen, setIsMen] = useState(true);
  const id = useRef(randomId());

  return (
    <Flex {...props}>
      <Flex mr="42px">
        <StyledRadio id={`men-${id.current}`} name={name} value="men" onChange={() => setIsMen(true)} defaultChecked />
        <Label htmlFor={`men-${id.current}`} font="s" fontWeight={isMen ? 'bold' : undefined}>
          {translations.male}
        </Label>
      </Flex>
      <Flex>
        <StyledRadio id={`women-${id.current}`} name={name} value="women" onChange={() => setIsMen(false)} />
        <Label htmlFor={`women-${id.current}`} font="s" fontWeight={!isMen ? 'bold' : undefined}>
          {translations.female}
        </Label>
      </Flex>
    </Flex>
  );
};

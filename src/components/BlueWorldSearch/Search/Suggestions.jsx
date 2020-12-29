import React from 'react';
import styled from 'styled-components';
import { Button, Flex, Span } from '@shared/components';
import { useTranslations } from '@shared/hooks';
import { useStore } from '../shared/Store';

const Suggestion = styled(Button).attrs({
  font: 'xxl',
  mt: '4',
})`
  font-weight: bold;
  font-style: italic;
  text-align: left;
`;

export default ({ ...props }) => {
  const { translations } = useTranslations('blueWorldSearch');
  const { dispatch } = useStore();

  return (
    <Flex flexDirection="column" {...props}>
      <Span font="s" fontWeight="bold">
        {/* extra span because of incorrect colon positioning on ios devices */}
        <span>{translations.recommended}</span>:
      </Span>
      {translations.suggestions.map((suggestion) => (
        <Suggestion key={suggestion} onClick={() => dispatch.searchTerm.set({ value: suggestion })}>
          {suggestion}
        </Suggestion>
      ))}
    </Flex>
  );
};

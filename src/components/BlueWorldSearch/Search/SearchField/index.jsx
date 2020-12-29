import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Basic, Label } from '@shared/components';
import { useTranslations } from '@shared/hooks';
import { useStore } from '../../shared/Store';
import SearchIcon from './SearchIcon';

const SearchField = styled(Label).attrs({
  display: 'flex',
  alignItems: 'center',
  borderRadius: '3',
  px: '4',
  py: '3',
})`
  border: solid 1px ${(props) => props.theme.colors.anthrazit};
  width: 100%;
  cursor: text;
`;

const InputField = styled(Basic.Input).attrs({
  font: 'l',
  border: '0',
})`
  width: 100%;

  ::placeholder {
    color: ${(props) => props.theme.colors.anthrazit};
    font-style: italic;
  }
`;

export default ({ searchTerm, onSearchTermChange, ...props }) => {
  const { translations } = useTranslations('blueWorldSearch');
  const { state } = useStore();
  const input = useRef();

  useEffect(() => {
    state.isOpen && input.current.focus();
  }, [state.isOpen]);

  return (
    <SearchField {...props}>
      <SearchIcon width="5" />
      <InputField
        ref={input}
        placeholder={translations.inputPlaceholder}
        ml="3"
        value={searchTerm ?? ''}
        onChange={({ target }) => onSearchTermChange(target.value)}
      />
    </SearchField>
  );
};

import React from 'react';
import styled from 'styled-components';
import { useTranslations } from '@shared/hooks';
import { Span, Spinner } from '@shared/components';
import { Button } from './shared';

const SubmitButton = styled(Button).attrs({
  type: 'submit',
  backgroundColor: 'blue',
})`
  display: flex;
  align-items: center;
  color: white;

  &:hover {
    background-color: ${(props) => props.theme.colors.darkBlue};
  }
`;

export default ({ isSubmitting, ...props }) => {
  const { translations } = useTranslations('snowboardSwap');

  return (
    <>
      <SubmitButton disabled={isSubmitting} {...props}>
        {isSubmitting && <Spinner position="absolute" color="white" ml="6px" />}
        <Span width="100%" textAlign="center">
          {translations.submit}
        </Span>
      </SubmitButton>
    </>
  );
};

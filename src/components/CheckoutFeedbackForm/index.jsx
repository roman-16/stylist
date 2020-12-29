import React, { useState } from 'react';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import { randomId } from '@helpers';
import { useContext, useTranslations } from '@shared/hooks';
import { Button, Flex, Form, Heading, Image, Label, Span } from '@shared/components';
import { useForm, Controller } from 'react-hook-form';
import Radios from './Radios';
import mutation from './mutation.graphql';

const forId = randomId();

const Container = styled.section`
  margin-bottom: -10px;
  padding: 10px 12px 20px;
  background-color: ${(props) => props.theme.colors.ultralightBlue};

  ${(props) => props.theme.mediaQueries.medium} {
    margin-bottom: 3rem;
    padding: unset;
    background-color: unset;
  }
`;

const Headline = styled(Heading.H3).attrs({ font: 'h-m', color: 'anthrazit' })`
  padding: 11px 20px 20px 0;
  letter-spacing: unset;
  margin-top: 1rem;

  ${(props) => props.theme.mediaQueries.medium} {
    margin-top: 2rem;
  }
`;

const StyledLabel = styled(Label).attrs({ font: 's' })`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const StyledTextarea = styled(Form.Textarea).attrs({ color: 'anthrazit' })`
  height: 80px;
  width: 100%;
  margin-bottom: 1.5rem;
`;

const Submit = styled(Button).attrs({
  backgroundColor: 'white',
  color: 'blue',
  font: 's',
})`
  width: 100%;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  border-radius: 0;
  border: 1px solid ${(props) => props.theme.colors.blue};
  transition: background-color 0.25s ease-out, color 0.25s ease-out;

  &:hover {
    background-color: ${(props) => props.theme.colors.blue};
    color: white;
  }
`;

const Background = styled(Flex).attrs({ backgroundColor: 'ultralightBlue' })`
  height: 560px;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${(props) => props.theme.mediaQueries.medium} {
    height: 576px;
  }

  ${(props) => props.theme.mediaQueries.large} {
    height: 458px;
  }
`;

const Checkmark = styled(Image).attrs({
  src: '/svg/icon-check-newblue.svg',
})`
  width: 36px;
  height: 30px;
`;

export default ({ ...props }) => {
  const { api, device } = useContext();
  const { translations, loading } = useTranslations('checkoutFeedbackForm');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { handleSubmit, register, control } = useForm();
  const [addFeedback] = useMutation(mutation);
  const onSubmit = (values) => {
    setIsSubmitted(true);
    addFeedback({
      variables: {
        input: {
          score: values.howPleasedAreYou,
          feedback: values.whatDoYouLike,
          improvement: values.whatDoYouDislike,
          device: device.toUpperCase(),
        },
      },
    });

    api.bto.tracking.trackEvent?.('checkout', 'click', 'feedback');
  };

  return (
    <Container {...props}>
      {!loading &&
        (isSubmitted ? (
          <Background>
            <Checkmark mb="10px" />
            <Span font="m" fontWeight="bold">
              {translations.thanksForSending}
            </Span>
          </Background>
        ) : (
          <>
            <Headline>{translations.headline}</Headline>
            <form onSubmit={handleSubmit(onSubmit)}>
              <StyledLabel htmlFor={`${forId}-1`}>{translations.howPleasedAreYou}</StyledLabel>
              <Controller
                as={<Radios mt="4" mb="6" />}
                id={`${forId}-1`}
                translations={translations}
                name="howPleasedAreYou"
                control={control}
                onChange={([selected]) => selected}
                defaultValue=""
              />
              <StyledLabel htmlFor={`${forId}-2`}>{translations.whatDoYouLike}</StyledLabel>
              <StyledTextarea ref={register} id={`${forId}-2`} name="whatDoYouLike" defaultValue="" />
              <StyledLabel htmlFor={`${forId}-3`}>{translations.whatDoYouDislike}</StyledLabel>
              <StyledTextarea ref={register} id={`${forId}-3`} name="whatDoYouDislike" defaultValue="" />
              <Submit mt="3">{translations.sendFeedback}</Submit>
            </form>
          </>
        ))}
    </Container>
  );
};

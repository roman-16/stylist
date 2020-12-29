import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useForm, Controller } from 'react-hook-form';
import { Box, Form } from '@shared/components';
import { useTranslations } from '@shared/hooks';
import { randomId } from '@helpers';
import { DialogButton, Label } from '../shared';
import useSetFeedback from './useSetFeedback';
import Happiness from './Happiness';

const forId = `feedback-${randomId()}`;

const Question = styled(Box)`
  margin-bottom: 20px;
`;

const Feedback = styled(Form.Textarea).attrs({
  font: 's',
})`
  width: 100%;
  resize: none;
  height: 95px;
`;

const SendButton = styled(DialogButton)`
  &:hover {
    color: ${(props) => props.theme.colors.anthrazit};
    background-color: white;
    border: 1px solid ${(props) => props.theme.colors.anthrazit};
  }
`;

export default ({ onSend, ...props }) => {
  const { translations } = useTranslations('pdpFeedbackForm');
  const { register, control, handleSubmit, watch } = useForm();
  const happiness = watch('happiness');
  const setFeedback = useSetFeedback();

  useEffect(() => {
    if (!happiness) return;

    setFeedback({ happiness });
    // Disable this rule so that setFeedback doesn't trigger the function
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [happiness]);

  return (
    <form
      onSubmit={handleSubmit((feedback) => {
        setFeedback(feedback);
        onSend && onSend();
      })}
      {...props}
    >
      <Question>
        <Label>{translations.howPleasedAreYou}</Label>
        <Controller
          // mr ist needed, so the whole dialog keeps the same width
          as={<Happiness mt="20px" />}
          control={control}
          name="happiness"
          onChange={([selected]) => selected}
        />
      </Question>
      <Box display={happiness !== undefined ? 'initial' : 'none'}>
        <Question>
          <Label htmlFor={forId}>{translations.yourFeedback}</Label>
          <Feedback name="feedback" id={forId} ref={register} mt="5px" />
        </Question>
        <SendButton type="submit">{translations.sendFeedback}</SendButton>
      </Box>
    </form>
  );
};

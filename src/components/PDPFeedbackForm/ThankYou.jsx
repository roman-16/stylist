import React from 'react';
import { Box } from '@shared/components';
import { useTranslations } from '@shared/hooks';
import { DialogButton, Label } from './shared';

export default ({ onClick, ...props }) => {
  const { translations } = useTranslations('pdpFeedbackForm');

  return (
    <Box {...props}>
      <Label>{translations.thankYouForYourFeedback}</Label>
      <DialogButton onClick={() => onClick && onClick()} mt="20px" mb="10px">
        {translations.continueShopping}
      </DialogButton>
    </Box>
  );
};

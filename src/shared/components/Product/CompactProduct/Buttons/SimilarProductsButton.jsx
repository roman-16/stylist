import React from 'react';
import { useTranslations } from '@shared/hooks';
import { Button } from './shared';

export default ({ ...props }) => {
  const { translations } = useTranslations('shopTheLook');

  return (
    <Button backgroundColor="#c3edf9" color="anthrazit" textOverflow {...props}>
      {translations.similarProducts}
    </Button>
  );
};

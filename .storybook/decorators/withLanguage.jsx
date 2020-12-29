import React, { useEffect, useRef } from 'react';
import { optionsKnob } from '@storybook/addon-knobs';
import dataLayer from './shared/dataLayer';

const dl = dataLayer.get();
const languages = {
  EN: 'en',
  CS: 'cs',
  DA: 'da',
  DE: 'de',
  ES: 'es',
  FI: 'fi',
  FR: 'fr',
  IT: 'it',
  NL: 'nl',
  NO: 'no',
  PL: 'pl',
  PT: 'pt',
  SL: 'sl',
  SV: 'sv',
};

const Language = ({ children }) => {
  const isInitialMount = useRef(true);
  const language = optionsKnob('Language', languages, dl[0].general.language, { display: 'select' }, 'Global');

  useEffect(() => {
    dl[0].general.language = language;
    dataLayer.set(dl);

    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      // Enforce reload on new set dataLayer
      window.location.reload();
    }
  }, [language]);

  return <>{children}</>;
};

export default (storyFn) => <Language>{storyFn()}</Language>;

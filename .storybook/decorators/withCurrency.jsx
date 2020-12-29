import React, { useEffect, useRef } from 'react';
import { optionsKnob } from '@storybook/addon-knobs';
import dataLayer from './shared/dataLayer';

const dl = dataLayer.get();
const currencies = {
  EUR: 'EUR',
  USD: 'USD',
  DKK: 'DKK',
  NOK: 'NOK',
  GBP: 'GBP',
  PLN: 'PLN',
  SEK: 'SEK',
  CHF: 'CHF',
  CZK: 'CZK',
};

const Currency = ({ children }) => {
  const isInitialMount = useRef(true);
  const currency = optionsKnob('Currency', currencies, dl[0].general.currency, { display: 'select' }, 'Global');

  useEffect(() => {
    dl[0].general.currency = currency;
    dataLayer.set(dl);

    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      // Enforce reload on new set dataLayer
      window.location.reload();
    }
  }, [currency]);

  return <>{children}</>;
};

export default (storyFn) => <Currency>{storyFn()}</Currency>;

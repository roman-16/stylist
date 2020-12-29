import React, { useEffect, useRef } from 'react';
import { optionsKnob } from '@storybook/addon-knobs';
import dataLayer from './shared/dataLayer';

const dl = dataLayer.get();
const countries = {
  GB: 'GB',
  AD: 'AD',
  AU: 'AU',
  AT: 'AT',
  AZ: 'AZ',
  BE: 'BE',
  BA: 'BA',
  BR: 'BR',
  BG: 'BG',
  CA: 'CA',
  CN: 'CN',
  CO: 'CO',
  HR: 'HR',
  CY: 'CY',
  CZ: 'CZ',
  DK: 'DK',
  EE: 'EE',
  FO: 'FO',
  FI: 'FI',
  AX: 'AX',
  FR: 'FR',
  GF: 'GF',
  DE: 'DE',
  GR: 'GR',
  GL: 'GL',
  HK: 'HK',
  HU: 'HU',
  IS: 'IS',
  IN: 'IN',
  IE: 'IE',
  IL: 'IL',
  IT: 'IT',
  JP: 'JP',
  LV: 'LV',
  LI: 'LI',
  LT: 'LT',
  LU: 'LU',
  MK: 'MK',
  MT: 'MT',
  MC: 'MC',
  ME: 'ME',
  NL: 'NL',
  NZ: 'NZ',
  NO: 'NO',
  OM: 'OM',
  PL: 'PL',
  PT: 'PT',
  QA: 'QA',
  RO: 'RO',
  SM: 'SM',
  SA: 'SA',
  RS: 'RS',
  SG: 'SG',
  SK: 'SK',
  SI: 'SI',
  ZA: 'ZA',
  KR: 'KR',
  ES: 'ES',
  IC: 'IC',
  EA: 'EA',
  SE: 'SE',
  CH: 'CH',
  TR: 'TR',
  UA: 'UA',
  AE: 'AE',
  GI: 'GI',
  GG: 'GG',
  JE: 'JE',
  US: 'US',
  CL: 'CL',
};

const Country = ({ children }) => {
  const isInitialMount = useRef(true);
  const country = optionsKnob('Country', countries, dl[0].general.country, { display: 'select' }, 'Global');

  useEffect(() => {
    dl[0].general.country = country;
    dataLayer.set(dl);

    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      // Enforce reload on new set dataLayer
      window.location.reload();
    }
  }, [country]);

  return <>{children}</>;
};

export default (storyFn) => <Country>{storyFn()}</Country>;

import { addParameters, addDecorator } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { withKnobs } from '@storybook/addon-knobs';
import { withBase, withCountry, withCurrency, withGender, withLanguage } from './decorators';

const viewportStyles = {
  border: '1px solid black',
  borderRadius: 'unset',
};

const viewports = {
  desktop: {
    name: 'Desktop',
    styles: {
      ...viewportStyles,
      position: 'inherit',
      height: '100%',
      width: '100%',
      margin: 'unset',
      border: 'unset',
    },
  },
  tablet: {
    name: 'Tablet',
    styles: {
      ...viewportStyles,
      height: '1024px',
      width: '768px',
    },
  },
  mobile: {
    name: 'Mobile',
    styles: {
      ...viewportStyles,
      height: '960px',
      width: '540px',
    },
  },
};

addParameters({
  viewport: {
    viewports: {
      ...viewports,
      ...INITIAL_VIEWPORTS,
    },
  },
  knobs: {
    escapeHTML: false,
  },
});

addDecorator(withKnobs);
addDecorator(withBase);
addDecorator(withCountry);
addDecorator(withCurrency);
addDecorator(withGender);
addDecorator(withLanguage);

import { mapKeys } from 'lodash-es';
import { MEDIA, RULESET } from 'stylis';
import { namespaceId } from '@shared/Provider/GlobalStyles';
import { createStyled } from '@/styler';
import context from '@context';

export default createStyled({
  theme: {
    // System UI https://system-ui.com/theme
    colors: {
      // Primary colors
      $blue: '#2d69aa',
      $newBlue: '#0099cc',
      $orange: '#ff6600',
      $yellow: '#ffde00',
      $red: '#ff4444',
      $green: '#40bb64',

      // Secondary colors
      $rose: '#ffefe5',
      $lightNewBlue: '#d6edf5',
      $ultralightBlue: '#f2f9fb',
      $lightLila: '#e1e7ef',
      $explorerBlue: '#527795',
      $setGreen: '#24a779',
      $darkBlue: '#11457c',
      $pacificBlue: '#94b4d0',
      $lightYellow: '#fff4aa',

      // Gray colors
      $darkGrey: '#999999',
      $middleGrey: '#cccccc',
      $grey: '#eaeaea',
      $lightGrey: '#f4f4f4',
      $white: '#ffffff',
      $anthrazit: '#333333',

      // Blue World Colors
      $buyersguideGreen: '#32cdab',
      $lightBuyersguideGreen: '#d7f5ee',
      $teamGreen: '#2fa9b4',
      $lightTeamGreen: '#d5eef0',
    },
    space: ['0px', '2px', '4px', '8px', '16px', '24px', '32px', '48px', '64px'],
    sizes: ['0px', '2px', '4px', '8px', '16px', '24px', '32px', '48px', '64px', '96px', '128px'],
    borderWidths: ['0px', '1px', '2px', '4px'],
    radii: ['0px', '1px', '2px', '4px', '8px', '16px'],
  },
  utils: ({ variants }) => ({
    font: variants(mapKeys(context.theme.fonts, (value, key) => `$${key}`)),
  }),
  breakpoints: {
    $small: (rules) => `@media (min-width: 576px) { ${rules} }`,
    $medium: (rules) => `@media (min-width: 768px) { ${rules} }`,
    $large: (rules) => `@media (min-width: 1024px) { ${rules} }`,
    $xlarge: (rules) => `@media (min-width: 1216px) { ${rules} }`,
    $xxlarge: (rules) => `@media (min-width: 1408px) { ${rules} }`,
  },
  stylis: {
    middlewares: [
      (element) => {
        let string = '';

        if ([RULESET, MEDIA].includes(element.type) && element.root === null) {
          string += `\n`;
        }

        if (element.type === RULESET) {
          string += `#${namespaceId} `;
        }

        return string;
      },
    ],
  },
});

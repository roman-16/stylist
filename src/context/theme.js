import { mapValues } from 'lodash-es';
import fonts from './fonts';

const isTouch = () => !!('ontouchstart' in window || navigator.maxTouchPoints);

const breakpoints = {
  small: '576px',
  medium: '768px',
  large: '1024px',
  xlarge: '1216px',
  xxlarge: '1408px',
};
const breakpointsPx = mapValues(breakpoints, (breakpoint) => Number(breakpoint.slice(0, -2)));

export default {
  // System UI https://system-ui.com/theme
  colors: {
    // Primary colors
    blue: '#2d69aa',
    newBlue: '#0099cc',
    orange: '#ff6600',
    yellow: '#ffde00',
    red: '#ff4444',
    green: '#40bb64',

    // Secondary colors
    rose: '#ffefe5',
    lightNewBlue: '#d6edf5',
    ultralightBlue: '#f2f9fb',
    lightLila: '#e1e7ef',
    explorerBlue: '#527795',
    setGreen: '#24a779',
    darkBlue: '#11457c',
    pacificBlue: '#94b4d0',
    lightYellow: '#fff4aa',

    // Gray colors
    darkGrey: '#999999',
    middleGrey: '#cccccc',
    grey: '#eaeaea',
    lightGrey: '#f4f4f4',
    white: '#ffffff',
    anthrazit: '#333333',

    // Blue World Colors
    buyersguideGreen: '#32cdab',
    lightBuyersguideGreen: '#d7f5ee',
    teamGreen: '#2fa9b4',
    lightTeamGreen: '#d5eef0',
  },
  space: ['0px', '2px', '4px', '8px', '16px', '24px', '32px', '48px', '64px'],
  sizes: ['0px', '2px', '4px', '8px', '16px', '24px', '32px', '48px', '64px', '96px', '128px'],
  borderWidths: ['0px', '1px', '2px', '4px'],
  radii: ['0px', '1px', '2px', '4px', '8px', '16px'],
  breakpoints: Object.assign(Object.values(breakpoints), breakpoints),
  mediaQueries: mapValues(breakpoints, (breakpoint) => `@media screen and (min-width: ${breakpoint})`),

  // Custom prop https://styled-system.com/variants
  fonts,

  // Custom
  breakpointsPx: Object.assign(Object.values(breakpointsPx), breakpointsPx),
  isTouch: isTouch(),
  // https://stackoverflow.com/a/5624139/5967068
  hexToRgb: (hex) => {
    let result = hex.replace(
      /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
      (_, red, green, blue) => red + red + green + green + blue + blue,
    );

    result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(result);

    return result
      ? {
          red: parseInt(result[1], 16),
          green: parseInt(result[2], 16),
          blue: parseInt(result[3], 16),
        }
      : null;
  },
  // https://stackoverflow.com/a/5624139/5967068
  rgbToHex: (red, green, blue) => `#${((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).slice(1)}`,
};

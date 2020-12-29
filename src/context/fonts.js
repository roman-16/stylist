import { mapValues } from 'lodash-es';

// Default font
const defaultFont = {
  fontFamily: 'Open Sans, Helvetica, Arial, sans-serif',
  fontSize: '13px',
  lineHeight: '1.54',
};

const fonts = {
  xs: {
    fontSize: '11px',
    lineHeight: '1.36',
  },
  s: {},
  m: {
    fontSize: '15px',
    lineHeight: '1.67',
  },
  l: {
    fontSize: '17px',
    lineHeight: '1.59',
  },
  xl: {
    fontSize: '20px',
    lineHeight: '1.5',
  },
  xxl: {
    fontSize: '26px',
    lineHeight: '1.38',
  },
  xxxl: {
    fontSize: '32px',
    lineHeight: '1.25',
  },
};

// Default headline font
const defaultHFont = {
  ...defaultFont,
  fontWeight: 'bold',
  letterSpacing: '1px',
};

const hFonts = {
  'h-s': {},
  'h-m': {
    fontSize: '15px',
    lineHeight: '1.67',
  },
  'h-l': {
    fontSize: '20px',
    lineHeight: '1.3',
  },
  'h-xl': {
    fontSize: '26px',
    lineHeight: '1.38',
  },
  'h-xxl': {
    fontSize: '32px',
    lineHeight: '1.25',
  },
  'h-xxxl': {
    fontSize: '60px',
    lineHeight: '1',
  },
};

// Default quotation font
const qFonts = {
  q: {
    ...defaultHFont,
    fontSize: '25px',
    fontStyle: 'italic',
    fontWeight: '300',
    lineHeight: '1.2',
  },
};

export default {
  ...mapValues(fonts, (font) => ({
    ...defaultFont,
    ...font,
  })),
  ...mapValues(hFonts, (font) => ({
    ...defaultHFont,
    ...font,
  })),
  ...qFonts,
};

import createGetStylisString from '../createGetStylisString';

const getStylisString = createGetStylisString({
  theme: {
    space: ['2px', '4px'],
    fontSizes: ['16px', '32px'],
    colors: { $red: '#FF0000', $blue: '#0000FF' },
    fonts: { $h: 'Arial', $t: 'Helvetica' },
    fontWeights: ['300', '500'],
    lineHeights: ['1.6', '2.2'],
    letterSpacings: ['1px', '2px'],
    sizes: ['32px', '64px'],
    borders: { $thin: '1px solid black', $thicc: '4px solid black' },
    borderWidths: ['1px', '4px'],
    borderStyles: { $normal: 'solid', $link: 'dotted' },
    radii: ['8px', '16px'],
    shadows: { $small: '1px 1px', $big: '4px 4px' },
    zIndices: ['0', '1'],
    transitions: { $fast: 'all 1s', $slow: 'all 4s' },
  },
  utilsObject: {
    display: (value) => (value === 'inline-block' ? 'block' : value),
  },
  breakpoints: {
    $small: (rules) => `@media (min-width: 576px) { ${rules} }`,
    $medium: (rules) => `@media (min-width: 768px) { ${rules} }`,
  },
});

it('resolves the basic utils', () => {
  expect(
    getStylisString({
      m: 0,
      p: 1,
      bg: '$red',
    }),
  ).toMatchSnapshot();

  expect(
    getStylisString({
      mt: 0,
      mr: 1,
      mb: 0,
      ml: 1,
      pt: 0,
      pr: 1,
      pb: 0,
      pl: 1,
    }),
  ).toMatchSnapshot();

  expect(
    getStylisString({
      mx: 0,
      my: 1,
      px: 0,
      py: 1,
    }),
  ).toMatchSnapshot();
});

it('allows styling', () => {
  expect(
    getStylisString({
      margin: 0,
      fontSize: 1,
      backgroundColor: '$red',
      fontFamily: '$t',
      fontWeight: 0,
      lineHeight: 1,
      letterSpacing: 0,
      height: 1,
      border: '$thin',
      borderWidth: 0,
      borderStyle: '$link',
      borderRadius: 1,
      boxShadow: '$small',
      zIndex: 0,
      transition: '$slow',

      padding: '7px', // Normal style
      p: 1, // Util style with theme
      display: 'inline-block', // Custom util

      // Breakpoints
      $small: {
        margin: 1,
      },
    }),
  ).toMatchSnapshot();
});

it("throws an error if it can't resolve a scale", () => {
  expect(() =>
    getStylisString({
      margin: 2,
    }),
  ).toThrow();
});

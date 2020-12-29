const mapSelectors = (...selectors) =>
  selectors.reduce(
    (accumulator, current) =>
      `${accumulator}
       ${current} {
         all: revert;
       }`,
    '',
  );

export default `
  all: revert;

  ${mapSelectors(
    '::-moz-focus-inner',
    '::after',
    '::backdrop',
    '::before',
    '::cue',
    '::cue-region',
    '::first-letter',
    '::first-line',
    '::grammar-error',
    '::marker',
    '::part(*)',
    '::placeholder',
    // FIXME: ::selection doesn't work when trying to revert, weird browser bug???
    // '::selection',
    '::slotted(*)',
    '::spelling-error',
  )}
`;

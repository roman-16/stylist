import styled from '@/astyle';

export default styled('button', {
  backgroundColor: 'unset',
  border: 'unset',
  outline: 'none',
  cursor: 'pointer',

  // button has a given color on ios devices
  WebkitTextFillColor: 'currentcolor',
  // stylelint-disable-next-line property-no-vendor-prefix
  WebkitAppearance: 'none',

  '&:disabled': {
    cursor: 'not-allowed',
  },
});

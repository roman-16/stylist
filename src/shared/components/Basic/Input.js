import styled from '@/astyle';

export default styled('input', {
  outline: 'none',

  '&:focus': {
    outline: 'none',
  },

  // remove input shadow from iOS devices
  // stylelint-disable-next-line property-no-vendor-prefix
  WebkitAppearance: 'none',
  // input has a given color on ios devices
  WebkitTextFillColor: 'currentcolor',
});

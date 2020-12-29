import styled from 'styled-components';
import styledSystem from '../shared/styledSystem';

export default styled.input`
  outline: none;

  &:focus {
    outline: none;
  }

  /* remove input shadow from iOS devices */
  /* stylelint-disable-next-line property-no-vendor-prefix */
  -webkit-appearance: none;

  /* input has a given color on ios devices */
  -webkit-text-fill-color: currentcolor;

  ${styledSystem}
`;

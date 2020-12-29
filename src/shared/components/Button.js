import styled from 'styled-components';
import styledSystem from './shared/styledSystem';

export default styled.button`
  background-color: unset;
  border: unset;
  outline: none;
  cursor: pointer;

  /* button has a given color on ios devices */
  -webkit-text-fill-color: currentcolor;
  /* stylelint-disable-next-line property-no-vendor-prefix */
  -webkit-appearance: none;

  &:disabled {
    cursor: not-allowed;
  }

  ${styledSystem}
`;

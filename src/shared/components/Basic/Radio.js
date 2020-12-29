import styled from 'styled-components';
import styledSystem from '../shared/styledSystem';
import Input from './Input';

export default styled(Input).attrs({ type: 'radio' })`
  /* Remove the styling of most browsers */
  /* stylelint-disable-next-line property-no-vendor-prefix */
  -webkit-appearance: none;
  cursor: pointer;

  height: 18px;
  width: 18px;
  min-width: 18px;
  min-height: 18px;
  background-color: white;
  border: 1px solid ${(props) => props.theme.colors.middleGrey};
  border-radius: 100%;

  /* suppress default touch action like double-tap zoom */
  touch-action: none;

  :checked::after {
    display: block;
    position: relative;
    content: '';
    width: 10px;
    height: 10px;
    left: 3px;
    top: 3px;
    border-radius: 100%;
    background-color: ${(props) => props.theme.colors.newBlue};
  }

  ${styledSystem}
`;

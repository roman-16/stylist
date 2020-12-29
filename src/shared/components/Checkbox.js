import styled from 'styled-components';
import styledSystem from './shared/styledSystem';
import Basic from './Basic';

export default styled(Basic.Input).attrs({ type: 'checkbox' })`
  /* Remove all styles from the input element */
  /* stylelint-disable-next-line property-no-vendor-prefix */
  -webkit-appearance: none;

  height: 25px;
  width: 25px;
  min-width: 25px;
  min-height: 25px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 0;
  cursor: pointer;

  ::after {
    position: relative;
    content: '';
    height: 25px;
    width: 25px;
    left: -1px;
    top: -1px;
    background-color: white;
  }

  :checked::after {
    display: block;
    content: '';
    background: url('//www.blue-tomato.com/svg/icon-checkbox-blue.vg.svg');
  }

  ${styledSystem}
`;

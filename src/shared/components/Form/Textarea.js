import styled from 'styled-components';
import styledSystem from '../shared/styledSystem';

export default styled.textarea`
  /* remove textarea shadow & round border from iOS devices */
  /* stylelint-disable-next-line property-no-vendor-prefix */
  -webkit-appearance: none;
  border-radius: 0px;

  outline: none;
  padding: 6px 12px;
  font-size: 15px;
  background-color: white;
  border: 1px solid ${(props) => props.theme.colors.middleGrey};
  resize: vertical;

  &:focus {
    outline: none;
    border: 1px solid ${(props) => props.theme.colors.anthrazit};
  }

  ${styledSystem}
`;

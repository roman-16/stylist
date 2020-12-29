import styled from 'styled-components';
import styledSystem from './shared/styledSystem';

export default styled.p`
  /* text has a given color on ios devices */
  -webkit-text-fill-color: currentColor;

  ${styledSystem}
`;

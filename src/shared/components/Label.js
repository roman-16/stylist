import styled from 'styled-components';
import styledSystem from './shared/styledSystem';

export default styled.label`
  &[for] {
    cursor: pointer;
  }

  ${styledSystem}
`;

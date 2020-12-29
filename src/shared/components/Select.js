import styled from 'styled-components';
import styledSystem from './shared/styledSystem';

export default styled.select`
  ${styledSystem}

  ${(props) =>
    props.appearance === 'none' &&
    `
      -webkit-appearance: none;
      -moz-appearance: none;
    `}
`;

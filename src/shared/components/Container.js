import styled from 'styled-components';
import styledSystem from './shared/styledSystem';
import Box from './Box';

export default styled(Box)`
  margin: 0 10px;

  ${(props) => props.theme.mediaQueries.medium} {
    margin: auto;
    max-width: 1300px;
    padding-left: 20px;
    padding-right: 20px;
  }

  ${styledSystem}
`;

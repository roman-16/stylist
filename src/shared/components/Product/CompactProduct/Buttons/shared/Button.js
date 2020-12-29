import styled from 'styled-components';
import Button from '../../../../Button';

export default styled(Button)`
  height: 35px;
  width: auto;
  max-width: 150px;
  font-size: 11px;
  font-weight: bold;
  padding: 0 5px;

  ${(props) => props.theme.mediaQueries.medium} {
    height: 40px;
    max-width: 200px;
    font-size: 15px;
  }
`;

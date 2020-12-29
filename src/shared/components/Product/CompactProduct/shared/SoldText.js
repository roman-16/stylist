import styled from 'styled-components';
import Text from '../../../Text';

export default styled(Text).attrs({
  color: 'red',
})`
  margin-top: 5px;
  font-weight: bold;
  z-index: 10;
`;

import styled from 'styled-components';
import Input from '../Input';

export default styled(Input).attrs({
  font: 'm',
})`
  height: 45px;
  padding: 0 8px;
  background-color: white;
  line-height: unset;

  &:focus {
    border: 1px solid ${(props) => props.theme.colors.anthrazit};
  }

  &::placeholder {
    color: ${(props) => props.theme.colors.darkGrey};
  }
`;

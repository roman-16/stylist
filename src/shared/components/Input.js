import styled from 'styled-components';
import Basic from './Basic';

export default styled(Basic.Input).attrs({
  font: 'm',
  color: 'anthrazit',
})`
  padding: 8px;
  border: 1px solid ${(props) => props.theme.colors.middleGrey};
`;

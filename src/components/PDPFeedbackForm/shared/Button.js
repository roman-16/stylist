import styled from 'styled-components';
import { Button } from '@shared/components';

export default styled(Button).attrs({
  font: 'm',
  bg: 'anthrazit',
})`
  color: white;
  /* button has a given color on ios devices */
  -webkit-text-fill-color: currentcolor;
  font-weight: bold;
  line-height: 1.33;
`;

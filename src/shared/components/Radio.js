import styled from 'styled-components';
import Basic from './Basic';

export default styled(Basic.Radio)`
  width: 24px;
  height: 24px;
  min-width: 24px;
  min-height: 24px;

  :checked::after {
    left: 6px;
    top: 6px;
  }
`;

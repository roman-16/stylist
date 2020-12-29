import styled from 'styled-components';
import { variant } from 'styled-system';
import styledSystem from './shared/styledSystem';

const type = (props) =>
  variant({
    prop: 'type',
    variants: {
      nav: {
        display: 'block',
        color: 'unset',
        textDecoration: props.textDecoration ?? 'none',
        '&:hover, :focus, :visited': {
          color: 'unset',
        },
      },
    },
  })(props);

export default styled.a`
  -webkit-text-fill-color: currentcolor;

  ${styledSystem}
  ${type}
`;

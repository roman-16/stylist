import styled from '@/astyle';

export default styled('a', ({ props }) => ({
  WebkitTextFillColor: 'currentcolor',

  ...(props.type === 'nav' && {
    display: 'block',
    color: 'unset',
    textDecoration: 'none',
    '&:hover, &:focus, &:visited': {
      color: 'unset',
    },
  }),
}));

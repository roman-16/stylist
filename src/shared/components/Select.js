import styled from '@/astyle';

export default styled('select', ({ props }) => ({
  ...(props.appearance === 'none' && {
    appearance: 'none',
    '-webkit-appearance': 'none',
    '-moz-appearance': 'none',
  }),
}));

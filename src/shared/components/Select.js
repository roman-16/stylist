import styled from '@/astyle';

export default styled('select', ({ props }) => ({
  ...(props.appearance === 'none' && {
    appearance: 'none',
    WebkitAppearance: 'none',
    MozAppearance: 'none',
  }),
}));

import styled from '@/astyle';
import Box from './Box';

export default styled(Box, {
  margin: '0 10px',

  $medium: {
    margin: 'auto',
    maxWidth: '1300px',
    paddingLeft: '20px',
    paddingRight: '20px',
  },
});

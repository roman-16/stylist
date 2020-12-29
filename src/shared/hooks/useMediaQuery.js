import { useWindowSize } from 'react-use';
import useContext from './useContext';

export default (size) => {
  const { theme } = useContext();
  const { width } = useWindowSize();

  return width >= theme.breakpointsPx[size];
};

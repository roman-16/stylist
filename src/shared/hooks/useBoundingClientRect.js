import { useWindowScroll } from 'react-use';

export default (ref) => {
  useWindowScroll();

  return ref.current?.getBoundingClientRect();
};

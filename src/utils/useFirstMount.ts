import { useEffect, useRef } from 'react';

const useFirstMount = () => {
  const firstMount = useRef(true);

  useEffect(() => {
    firstMount.current = false;
  }, []);

  return firstMount.current;
};

export default useFirstMount;

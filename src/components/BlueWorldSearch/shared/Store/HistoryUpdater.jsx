import React, { useEffect } from 'react';
import searchParam from './searchParam';
import { useStore } from '.';

export default ({ ...props }) => {
  const { dispatch } = useStore();

  useEffect(() => {
    const updateSearchTerm = () => {
      const param = searchParam.get();

      if (param !== null) {
        dispatch.searchTerm.set({ value: param, setParam: false });
      } else {
        dispatch.searchTerm.remove({ setParam: false });
      }
    };

    window.addEventListener('popstate', updateSearchTerm);

    return () => window.removeEventListener('popstate', updateSearchTerm);
  }, [dispatch.searchTerm]);

  return <React.Fragment {...props} />;
};

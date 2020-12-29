import React, { useEffect, useRef } from 'react';
import { Flex } from '@shared/components';
import { useStore } from '../shared/Store';
import useSearch from './useSearch';
import Logo from './Logo';
import SearchField from './SearchField';
import Suggestions from './Suggestions';
import Result from './Result';

export default ({ ...props }) => {
  const initialRender = useRef(true);
  const { dispatch } = useStore();
  const [{ searchTerm, loading, error, data }, setSearchTerm] = useSearch();

  useEffect(() => {
    initialRender.current && searchTerm !== null && dispatch.searchTerm.set({ value: searchTerm, setParam: false });

    initialRender.current = false;
  }, [dispatch.searchTerm, searchTerm]);

  return (
    <Flex {...props} flexDirection="column" alignItems="center" px={{ _: '10px', medium: '30px' }}>
      <Logo mt="6" />
      <SearchField mt="5" searchTerm={searchTerm} onSearchTermChange={(value) => setSearchTerm(value)} />
      {!error && (loading || data) && (
        <Result mt="6" width="100%" blueWorld={data ? data.blueWorld : []} loading={loading} />
      )}
      {!loading && !error && !data && <Suggestions mt="5" width="100%" />}
    </Flex>
  );
};

import { useEffect, useRef, useState } from 'react';
import { useApolloClient } from '@apollo/client';
import { useStore } from '../../shared/Store';
import query from './query.graphql';

export default () => {
  const timeoutId = useRef(0);
  const initialRender = useRef(true);
  const { state, dispatch } = useStore();
  const [{ data, loading, error }, setResult] = useState({ loading: false });
  const client = useApolloClient();

  useEffect(() => {
    const getResult = async () => {
      const result = await client.query({
        query,
        variables: { searchTerm: state.searchTerm },
        fetchPolicy: 'no-cache',
      });

      setResult(result);
    };

    clearTimeout(timeoutId.current);

    if (state.searchTerm && state.searchTerm.trim() !== '') {
      setResult({ loading: true });

      // If searchTerm has a value on initial render, don't wait to get results
      initialRender.current ? getResult() : (timeoutId.current = setTimeout(getResult, 500));
    } else {
      setResult({ loading: false });
    }

    initialRender.current = false;

    return () => clearTimeout(timeoutId.current);
  }, [client, state.searchTerm]);

  return [
    {
      searchTerm: state.searchTerm,
      data,
      loading,
      error,
    },
    (value) => dispatch.searchTerm.set({ value, batch: value !== '' }),
  ];
};

import { useCallback, useEffect, useState } from 'react';
import { useEvent } from 'react-use';
import { useStore } from './shared/Store';

export default (selector) => {
  const { dispatch } = useStore();
  const [button, setButton] = useState();

  useEffect(() => {
    setButton(document.querySelector(selector));
  }, [selector]);

  useEvent(
    'click',
    useCallback(() => dispatch.searchTerm.set({ value: '' }), [dispatch.searchTerm]),
    button,
  );
};

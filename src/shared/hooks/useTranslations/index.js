import { useEffect, useState, useRef } from 'react';
import { useApolloClient } from '@apollo/client';
import { useCache, useContext } from '@shared/hooks';
import query from './query.graphql';

const mapTranslations = (translations) =>
  translations.reduce(
    (carry, current) => ({
      ...carry,
      [current.key]: current.values.length <= 1 ? current.values[0] : current.values,
    }),
    {},
  );

export default (id) => {
  const { language } = useContext();
  const unmounted = useRef(false);
  const cache = useCache(`translations-${id}-${language}`);
  const client = useApolloClient();
  const [response, setResponse] = useState({
    // Return empty array on property access, will be replaced when the translations loaded
    translations: new Proxy({}, { get: () => [] }),
    loading: true,
  });

  useEffect(() => {
    const translations = cache.get();

    if (!translations) {
      client.query({ query, variables: { id } }).then(({ data }) => {
        if (unmounted.current) return;

        const newTranslations = mapTranslations(data.widget.translations);

        // ttl = 1 day
        cache.set(newTranslations, 60 * 60 * 24);

        setResponse({
          translations: newTranslations,
          loading: false,
        });
      });
    } else {
      setResponse({
        translations,
        loading: false,
      });
    }

    return () => (unmounted.current = true);
  }, [cache, client, id]);

  return response;
};

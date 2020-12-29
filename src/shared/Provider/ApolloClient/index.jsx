import React from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache, from } from '@apollo/client';
import { BatchHttpLink } from '@apollo/client/link/batch-http';
import env from '@env';
import context from '@context';
import { baseURL } from '@helpers';
import mapper from './mapper';

let localStorageGid = localStorage.getItem('gid');

const client = new ApolloClient({
  name: 'web',
  link: from([
    mapper((value, type) => {
      if (type === 'string') {
        try {
          const url = new URL(value);
          const { href, host } = url;

          if (host !== window.location.host) return value;

          // Create url without domain for better SEO
          const pathname = href.slice(href.indexOf(host) + host.length);

          // Add base-url if it is set, useful for local development and contenthub
          const newURL = baseURL.getPathname(pathname);

          return newURL;
        } catch (_) {
          return value;
        }
      }

      return value;
    }),
    new BatchHttpLink({
      uri: `${env.GRAPHQL + context.language}_${context.country}_${context.currency}`,
      fetch: async (input, init) => {
        const response = await fetch(input, {
          ...init,
          headers: {
            ...init.headers,
            ...(localStorageGid && { gid: localStorageGid }),
            ...(context.uid && { uid: context.uid }),
          },
        });

        if (!localStorageGid) {
          const gid = response.headers.get('gid');

          localStorage.setItem('gid', gid);
          localStorageGid = gid;
        }

        return response;
      },
    }),
  ]),
  cache: new InMemoryCache(),
});

const GraphQLClient = ({ children }) => <ApolloProvider client={client}>{children}</ApolloProvider>;

export default GraphQLClient;
export { client };

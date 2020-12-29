import React from 'react';
import ApolloClient, { client as apolloClient } from './ApolloClient';
import GlobalStyles from './GlobalStyles';
import Context from './Context';
import Theme from './Theme';

export default ({ withContext, withApollo, children }) => {
  const DataContext = ({ children: contextChildren }) =>
    withContext ? (
      <Context>
        <Theme>{contextChildren}</Theme>
      </Context>
    ) : (
      <>{contextChildren}</>
    );
  const ApolloContext = ({ children: apolloChildren }) =>
    withApollo ? <ApolloClient>{apolloChildren}</ApolloClient> : <>{apolloChildren}</>;

  return (
    <React.StrictMode>
      <GlobalStyles>
        <DataContext>
          <ApolloContext>{children}</ApolloContext>
        </DataContext>
      </GlobalStyles>
    </React.StrictMode>
  );
};
export { apolloClient };

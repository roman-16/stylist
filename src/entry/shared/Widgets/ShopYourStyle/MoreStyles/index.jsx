import React from 'react';
import { useQuery } from '@apollo/client';
import { MoreStyles } from '@components/ShopYourStyle';
import Provider, { apolloClient } from '@shared/Provider';
import context from '@context';
import prepareRootElement from '../../../prepareRootElement';
import { customMount } from '../../shared';
import query from './query.graphql';

export default customMount(
  (props) => <MoreStyles {...props} />,
  // We want to replace the old DOM when we have the data loaded, so that no blank widget is represented
  async (Widget, selector, config) => {
    const queryOptions = { query, variables: { gender: context.gender.toUpperCase() } };

    // This is query is only needed to start the request, the data is read from useQuery
    // We do this so that useQuery can handle apollo cache updates and rerender the Widget component
    await apolloClient.query(queryOptions);

    const WidgetWithQuery = ({ ...props }) => {
      // This data is already cached from the above query
      const { data } = useQuery(query, queryOptions);

      return <Widget styles={data.shopYourStyleStyles} {...props} />;
    };

    const ReturnWidget = () => (
      <Provider withApollo withContext>
        <WidgetWithQuery {...config.component} />
      </Provider>
    );

    if (selector) {
      const rootElement = prepareRootElement(selector, config.rootComponent);

      return [ReturnWidget, rootElement];
    }

    return [ReturnWidget];
  },
);

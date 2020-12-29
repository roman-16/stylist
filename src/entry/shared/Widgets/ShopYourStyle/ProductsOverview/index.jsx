import React from 'react';
import { ProductsOverview } from '@components/ShopYourStyle';
import Provider, { apolloClient } from '@shared/Provider';
import prepareRootElement from '../../../prepareRootElement';
import { customMount } from '../../shared';
import query from './query.graphql';

export default customMount(
  (props) => (
    <Provider withApollo withContext>
      <ProductsOverview {...props} />
    </Provider>
  ),
  async (Widget, selector, config) => {
    const { data } = await apolloClient.query({ query, variables: { ids: config.ids } });
    const ReturnWidget = () => <Widget products={data.products.nodes} {...config.component} />;

    if (selector) {
      const rootElement = prepareRootElement(selector, config.rootComponent);

      return [ReturnWidget, rootElement];
    }

    return [ReturnWidget];
  },
);

import React from 'react';
import { SnowboardFinder } from '@components/BuyersGuide';
import Provider from '@shared/Provider';

export default (props) => (
  <Provider withApollo withContext>
    <SnowboardFinder {...props} />
  </Provider>
);

import React from 'react';
import { Calculator } from '@components/BuyersGuide';
import Provider from '@shared/Provider';

export default (props) => (
  <Provider withApollo withContext>
    <Calculator {...props} />
  </Provider>
);

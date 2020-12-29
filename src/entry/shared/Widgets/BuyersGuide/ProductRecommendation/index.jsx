import React from 'react';
import { ProductRecommendation } from '@components/BuyersGuide';
import Provider from '@shared/Provider';

export default (props) => (
  <Provider withApollo withContext>
    <ProductRecommendation {...props} />
  </Provider>
);

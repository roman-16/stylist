import React from 'react';
import { ProductSwiper } from '@components/BuyersGuide';
import Provider from '@shared/Provider';

export default (props) => (
  <Provider withApollo withContext>
    <ProductSwiper {...props} />
  </Provider>
);

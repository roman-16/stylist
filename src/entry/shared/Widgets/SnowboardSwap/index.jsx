import React from 'react';
import SnowboardSwap from '@components/SnowboardSwap';
import Provider from '@shared/Provider';

export default (props) => (
  <Provider withApollo withContext>
    <SnowboardSwap {...props} />
  </Provider>
);

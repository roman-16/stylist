import React from 'react';
import BlueWorldStories from '@components/BlueWorldStories';
import Provider from '@shared/Provider';

export default (props) => (
  <Provider withApollo withContext>
    <BlueWorldStories {...props} />
  </Provider>
);

import React from 'react';
import PDPFeedbackForm from '@components/PDPFeedbackForm';
import Provider from '@shared/Provider';

export default (props) => (
  <Provider withApollo withContext>
    <PDPFeedbackForm {...props} />
  </Provider>
);

import React from 'react';
import CheckoutFeedbackForm from '@components/CheckoutFeedbackForm';
import Provider from '@shared/Provider';

export default (props) => (
  <Provider withApollo withContext>
    <CheckoutFeedbackForm {...props} />
  </Provider>
);

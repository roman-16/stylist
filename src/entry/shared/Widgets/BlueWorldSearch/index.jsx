import React from 'react';
import BlueWorldSearch from '@components/BlueWorldSearch';
import Provider from '@shared/Provider';
import ReactDOM from 'react-dom';

export default (props) =>
  ReactDOM.createPortal(
    <Provider withApollo withContext>
      <BlueWorldSearch {...props} />
    </Provider>,
    document.body,
  );

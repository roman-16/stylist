import React from 'react';
import { createStore } from '@blue-tomato/use-retext';
import * as reducer from './reducer';
import searchParam from './searchParam';
import HistoryUpdater from './HistoryUpdater';

const [Store, useStore] = createStore({
  state: {
    searchTerm: searchParam.get(),
    isOpen: false,
  },
  reducer,
});

export default ({ children, ...props }) => (
  <Store {...props}>
    <HistoryUpdater>{children}</HistoryUpdater>
  </Store>
);
export { useStore };

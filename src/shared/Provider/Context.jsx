import React from 'react';
import context from '@context';

const Context = React.createContext();

export default ({ ...props }) => <Context.Provider {...props} value={context} />;
export { Context };

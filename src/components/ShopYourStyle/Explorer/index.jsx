import React from 'react';
import { Background } from '../shared';
import DefaultLayout from './DefaultLayout';
import CompactLayout from './CompactLayout';

export default ({ layout = 'default', styles, ...props }) => {
  const Layout = {
    default: DefaultLayout,
    compact: CompactLayout,
  }[layout];

  return (
    <Background {...props}>
      <Layout styles={styles} />
    </Background>
  );
};

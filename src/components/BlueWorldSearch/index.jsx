import React from 'react';
import Store from './shared/Store';
import useButton from './useButton';
import SideMenu from './SideMenu';
import Search from './Search';

const BlueWorldSearch = ({ ...props }) => {
  useButton('#c-bw-search-button');

  return (
    <SideMenu {...props}>
      <Search />
    </SideMenu>
  );
};

export default ({ ...props }) => (
  <Store>
    <BlueWorldSearch {...props} />
  </Store>
);

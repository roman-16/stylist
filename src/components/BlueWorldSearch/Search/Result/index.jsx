/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import { Box } from '@shared/components';
import Tabs from './Tabs';
import List from './List';

export default ({ blueWorld, loading, ...props }) => {
  const [selectedType, setSelectedType] = useState('All');

  return (
    <Box {...props}>
      <Tabs
        blueWorld={blueWorld}
        loading={loading}
        selected={selectedType}
        onSelectedChange={(type) => setSelectedType(type)}
      />
      <List
        blueWorld={blueWorld.filter((entry) => (selectedType !== 'All' ? entry.__typename === selectedType : true))}
        loading={loading}
        mt="6"
      />
    </Box>
  );
};

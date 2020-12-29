import React from 'react';
import SnowboardFinder from '.';

export default {
  title: 'Widgets/BuyersGuide/SnowboardFinder',
};

export const Default = () => (
  <SnowboardFinder
    data={{
      detailMarkups: {
        snowboardBoots: '<strong>snowboardBoots</strong> snowboardBoots',
        ridingLevel: '<strong>ridingLevel</strong> ridingLevel',
        ridingStyle: '<strong>ridingStyle</strong> ridingStyle',
      },
    }}
  />
);

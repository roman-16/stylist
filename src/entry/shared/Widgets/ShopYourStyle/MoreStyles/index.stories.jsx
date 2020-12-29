import React from 'react';
import { text } from '@storybook/addon-knobs';
import context from '@context';
import { useCustomMount } from '../../shared';
import MoreStyles from '.';

export default {
  title: 'Widgets/ShopYourStyle/MoreStyles',
};
const getStyleId = () => (context.gender === 'women' ? '4850' : '4800');

export const Default = () => {
  const Widget = useCustomMount(MoreStyles, {
    component: {
      styleId: text('Style-ID', getStyleId()),
    },
  });

  return (
    <div style={{ height: '200vh' }}>
      <Widget />
    </div>
  );
};

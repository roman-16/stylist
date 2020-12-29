import React from 'react';
import { text } from '@storybook/addon-knobs';
import { useCustomMount } from '../../shared';
import MoreStyles from '.';

export default {
  title: 'Widgets/ShopYourStyle/StyleLike',
};

export const Default = () => {
  const Widget = useCustomMount(MoreStyles, {
    component: {
      styleId: text('Style-ID', '4990'),
    },
  });

  return <Widget />;
};

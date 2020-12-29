import React from 'react';
import { text } from '@storybook/addon-knobs';
import context from '@context';
import ShopYourStyle from '.';

const getProductId = () => (context.gender === 'women' ? '606475___beige' : '610112___silver_black');

export default {
  title: 'Widgets/ShopYourStyle/Explorer/Standalone',
};

export const Default = () => <ShopYourStyle />;
export const Compact = () => <ShopYourStyle layout="compact" productId={text('Product ID', getProductId())} />;

import React from 'react';
import { useCustomMount } from '../../shared';
import ProductsOverview from '.';

export default {
  title: 'Widgets/ShopYourStyle/ProductsOverview',
};

export const Default = () => {
  const Widget = useCustomMount(ProductsOverview, {
    ids: ['594211___blue', '597453___whisper_white_june_bug', '610751___summit_wht_blk_summit_wht', '607807___navy'],
  });

  return (
    <div style={{ maxWidth: '500px' }}>
      <Widget />
    </div>
  );
};

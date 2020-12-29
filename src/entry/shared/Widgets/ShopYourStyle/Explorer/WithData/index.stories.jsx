import React from 'react';
import { array, text } from '@storybook/addon-knobs';
import ShopYourStyle from '.';

export default {
  title: 'Widgets/ShopYourStyle/Explorer/WithData',
};

export const Default = () => {
  const title = text('Title', 'Style');
  const headline = text('Headline', 'Style Headline');
  const image = text(
    'Image',
    'https://images.blue-tomato.com/is/image/bluetomato/ugc/302023626_style2-1566898861_1112.tif',
  );
  const products = array('Products', ['426438___cypress_rinsed', '594301___black', '28323___black']);

  return (
    <ShopYourStyle
      data={{
        title,
        headline,
        image,
        url: '/',
        products,
      }}
    />
  );
};

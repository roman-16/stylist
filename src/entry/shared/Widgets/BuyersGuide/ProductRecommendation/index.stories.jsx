/* eslint-disable max-len */
import React from 'react';
import { select } from '@storybook/addon-knobs';
import ProductRecommendation from '.';

export default {
  title: 'Widgets/BuyersGuide/ProductRecommendation',
};

const options = {
  gender: [
    {
      query:
        'fh_location=//catalog01/de_DE/parent_categories>{00000001}/vc_gender_age>{women}/c_ridingstyle_neu>{all_mountain}&fh_reffacet=c_ridingstyle_neu&fh_refpath=facet_14&fh_refview=lister',
      title: 'Damen All-Mountain',
      gender: 'women',
      button: {
        text: 'Mehr Damen Snowboards',
        url:
          'https://www.blue-tomato.com/de-AT/products/c_ridingstyle_neu/all/+mountain/categories/00000000--00000001/gender/women',
      },
    },
    {
      query:
        'fh_location=//catalog01/de_DE/parent_categories>{00000001}/vc_gender_age>{men}/c_ridingstyle_neu>{all_mountain}&fh_reffacet=c_gender_age&fh_refview=lister&fh_refpath=facet_17',
      title: 'Herren All-Mountain',
      gender: 'men',
      button: {
        text: 'Mehr Herren Snowboards',
        url:
          'https://www.blue-tomato.com/de-AT/products/c_ridingstyle_neu/all/+mountain/categories/00000000--00000001/gender/men',
      },
    },
  ],

  unisex: {
    query:
      'fh_location=//catalog01/de_DE/parent_categories>{00000016}/c_concave_neu>{low}&fh_refview=lister&fh_refpath=7f827ed6-4cf1-48f4-baae-510a4a0093f4&fh_reffacet=c_concave_neu',
    button: {
      text: 'Mehr Snowboards',
      url:
        'https://www.blue-tomato.com/de-AT/products/c_ridingstyle_neu/all/+mountain/categories/00000000--00000001/gender/women',
    },
  },
};

export const Default = () => (
  <ProductRecommendation data={options[select('Mode', { Gender: 'gender', Unisex: 'unisex' }, 'gender')]} />
);

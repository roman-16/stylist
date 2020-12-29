import React from 'react';
import { useQuery } from '@apollo/client';
import { Explorer } from '@components/ShopYourStyle';
import Provider from '@shared/Provider';
import query from './query.graphql';

const ShopYourStyle = ({ data, ...props }) => {
  const { data: products, loading, error } = useQuery(query, {
    variables: {
      ids: data.products ?? [],
      currency: 'EUR',
    },
  });

  const styles = loading
    ? []
    : [
        {
          id: data.title || '1',
          title: data.title || 'Style 1',
          headline: data.headline || 'Style Headline',
          images: [
            {
              image: data.image,
            },
          ],
          url: '',
          products: products.products,
        },
      ];

  if (loading || error || styles.length <= 0) return null;

  return <Explorer {...props} styles={styles} />;
};

export default (props) => (
  <Provider withApollo withContext>
    <ShopYourStyle {...props} />
  </Provider>
);

import React, { useEffect, useRef } from 'react';
import { useQuery } from '@apollo/client';
import { randomId } from '@helpers';
import { Explorer } from '@components/ShopYourStyle';
import { useContext } from '@shared/hooks';
import Provider from '@shared/Provider';
import * as query from './query.graphql';

const useShopYourStyle = (productId) => {
  const { gender } = useContext();
  const { loading, error, data } = useQuery(
    productId ? query.ProductShopYourStyleQuery : query.ShopYourStyleQuery,
    productId
      ? {
          variables: {
            gender: gender.toUpperCase(),
            productId,
          },
        }
      : {
          variables: {
            gender: gender.toUpperCase(),
          },
        },
  );
  const styles =
    loading || error || !(data.products || data.shopYourStyleStyles)
      ? []
      : productId
      ? data.products.nodes[0].shopYourStyleStyles
      : data.shopYourStyleStyles;

  return { loading, error, styles };
};

const ShopYourStyle = ({ layout = 'default', productId, ...props }) => {
  const { api } = useContext();
  const sysId = useRef(randomId());
  const { loading, error, styles } = useShopYourStyle(productId);

  useEffect(() => {
    api.dataLayer.pushProductImpressions(`#${sysId.current} .track-load-producttile`);
  }, [api]);

  if (loading || error || styles.length <= 0) return null;

  return <Explorer {...props} id={sysId.current} layout={layout} styles={styles} />;
};

export default (props) => (
  <Provider withApollo withContext>
    <ShopYourStyle {...props} />
  </Provider>
);

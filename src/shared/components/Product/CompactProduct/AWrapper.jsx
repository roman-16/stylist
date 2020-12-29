import React from 'react';
import { useAnalyticsProps } from '../shared';
import A from '../../A';

export default ({ product, ...props }) => {
  const analyticsProps = useAnalyticsProps(product);

  return (
    <A
      type="nav"
      href={product.url}
      onClick={
        product.meta.trackingURL
          ? (event) => {
              event.preventDefault();

              fetch(product.meta.trackingURL).finally(() => {
                window.location = product.url;
              });
            }
          : undefined
      }
      {...analyticsProps}
      {...props}
    />
  );
};

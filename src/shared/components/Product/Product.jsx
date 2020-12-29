import React from 'react';
import { useMediaQuery } from '@shared/hooks';
import A from '../A';
import Image from '../Image';
import { ProductInformation, useAnalyticsProps } from './shared';

export default ({ image, product, textAlign, paddingLeft, ...props }) => {
  const analyticsProps = useAnalyticsProps(product);
  const isMedium = useMediaQuery('medium');
  const productInformationTextAlign = textAlign ?? (isMedium ? 'center' : 'left');

  return (
    // Added overflow to get text-overflow working
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
      overflow="hidden"
      {...analyticsProps}
      {...props}
    >
      <Image
        aspectRatio={{ width: 600, height: 800 }}
        alt={product.name}
        width="100%"
        {...image}
        src={{
          src: product.image,
          preset: 'pdtx2',
          width: 600,
          height: 800,
          ...image?.src,
        }}
      />
      <ProductInformation
        product={product}
        mt="8px"
        pl={productInformationTextAlign === 'left' ? '5px' : '16px'}
        pr={productInformationTextAlign === 'right' ? '5px' : '16px'}
        pb="10px"
        textAlign={productInformationTextAlign}
      />
    </A>
  );
};

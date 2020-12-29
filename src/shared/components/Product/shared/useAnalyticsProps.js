import { useMemo } from 'react';
import { addBaseAnalyticsProps } from '@helpers';

export default (product) =>
  useMemo(
    () =>
      addBaseAnalyticsProps({
        className: 'track-click track-load-producttile',
        action: 'click-producttile',
        articlenr: product.meta.code,
        productname: `${product.brand} ${product.meta.englishname}`,
        categorie: product.meta.breadcrumb,
        brand: product.brand,
        'brand-color': product.meta.colorId,
      }),
    [product.brand, product.meta.code, product.meta.englishname, product.meta.breadcrumb, product.meta.colorId],
  );

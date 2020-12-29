import React from 'react';
import { CompactProduct } from '@shared/components';
import { useMediaQuery } from '@@/src/shared/hooks';

export default ({ ...props }) => {
  const isMedium = useMediaQuery('medium');

  return (
    <CompactProduct
      image={{
        width: { _: '100px', medium: '125px' },
        src: isMedium ? { width: 250, height: 334 } : undefined,
      }}
      padding={{ medium: 'unset' }}
      {...props}
    />
  );
};

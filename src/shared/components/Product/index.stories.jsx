import React from 'react';
import Provider from '@shared/Provider';
import Box from '../Box';
import * as Product from '.';

export default {
  title: 'Components/Product',
};

const product = {
  brand: 'Broken Promises',
  name: 'Bar Logo Shirt',
  image:
    // eslint-disable-next-line max-len
    '//images.blue-tomato.com/is/image/bluetomato/304048933_front.jpg--_fw3lHXLWrcTNIePFSFsd0M0wo/304048933+front+jpg.jpg',
  url: '/en-AT/product/Broken+Promises-Bar+Logo+Shirt-584030/',
  color: 'black',
  minPrice: {
    priceLocalDisplay: '€ 49.95',
    regularPriceLocalDisplay: '€ 69.95',
    isDiscountPrice: true,
  },
  meta: {
    code: '348294',
    colorId: 'black',
    breadcrumb: 'hemd/skate',
    englishname: 'Bar Logo Shirt',
  },
};

const Container = ({ children, width = '200px', ...props }) => (
  <Box width={width} {...props}>
    <Provider withApollo withContext>
      {children}
    </Provider>
  </Box>
);

export const Default = () => (
  <Container>
    <Product.Product product={product} />
  </Container>
);
export const CompactProduct = () => (
  <Container width="400px">
    <Product.CompactProduct product={product} />
  </Container>
);

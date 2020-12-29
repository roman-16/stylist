import cookies from 'js-cookie';
import dataLayer from './dataLayer';

const createShopEnv = () => {
  if (!window.dataLayer) {
    const localStorageDataLayer = JSON.parse(localStorage.getItem('dataLayer'));

    if (localStorageDataLayer) {
      window.dataLayer = localStorageDataLayer;
    } else {
      window.dataLayer = dataLayer;
    }
  }

  cookies.get('gender', 'men') ?? cookies.set('gender', 'men');
};

createShopEnv.replace = () => {
  window.dataLayer = dataLayer;

  cookies.set('gender', 'men');
};

export default createShopEnv;

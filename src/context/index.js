import cookies from 'js-cookie';
import api from './api';
import theme from './theme';

const resolveCurrency = (currency) =>
  ({
    SFR: 'CHF',
  }[currency] ?? currency);

const resolvePageType = (pageType) =>
  ({
    'BUYERS-GUIDES': 'buyers-guides',
    HOMEPAGE: 'home',
    DETAILPAGE: 'detailpage',
    LANDINGPAGE: 'page',
    'SHOP-YOUR-STYLE': 'shop-your-style',
  }[pageType] ?? pageType);

const resolveGenders = (gender) =>
  ({
    woman: 'women',
    women: 'women',
    female: 'women',
    man: 'men',
    men: 'men',
    male: 'men',
    kid: 'kids',
    kids: 'kids',
  }[gender]);

export default {
  api,
  theme,
  language: api.dataLayer.general.language ?? 'en',
  country: api.dataLayer.general.country ?? 'GB',
  currency: resolveCurrency(api.dataLayer.general.currency) ?? 'EUR',
  omniCountries: ['AT', 'CH', 'DE', 'FI', 'NL'],
  pageType: resolvePageType(api.dataLayer.general['page-type']) ?? '',
  gender: resolveGenders(cookies.get('gender')?.toLowerCase()) ?? 'men',
  device: api.dataLayer.general.device.toLowerCase() ?? 'desktop',
  uid: api.dataLayer.general.uid,
};

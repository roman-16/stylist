import context from '@context';
import env from '@env';

const baseURL = () => !!env.BASE_URL;

baseURL.getPathname = (pathname, addLocale = false) => {
  if (!baseURL()) return pathname;

  const url = new URL(env.BASE_URL, window.location.origin);

  url.pathname = pathname;

  if (addLocale) {
    url.pathname = `/${context.language}-${context.country}${url.pathname}`;
  }

  return url.href;
};

export default baseURL;

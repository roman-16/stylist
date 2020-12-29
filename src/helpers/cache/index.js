const prefix = 'bt-widgets-cache-';
const getSeconds = () => Math.round(Date.now() / 1000);

const cache = (key) => {
  const cacheKey = prefix + key;
  const cacheHelper = {
    remove: () => localStorage.removeItem(cacheKey),
  };

  return {
    ...cacheHelper,

    set: (value, ttl = 60) => {
      const futureTTL = getSeconds() + ttl;

      localStorage.setItem(
        cacheKey,
        JSON.stringify({
          ttl: futureTTL,
          value,
        }),
      );
    },

    get: () => {
      const data = JSON.parse(localStorage.getItem(cacheKey));

      if (data === null || data.ttl <= getSeconds()) {
        cacheHelper.remove();

        return undefined;
      }

      return data.value;
    },
  };
};

cache.clear = () => {
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith(prefix)) {
      localStorage.removeItem(key);
    }
  });
};

export default cache;

const setSearchParams = (searchParams, reload) => {
  if (reload) {
    window.location.search = searchParams;
  } else {
    const newurl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?${searchParams}`;

    window.history.pushState({}, '', newurl);
  }
};

const get = (key) => new URLSearchParams(window.location.search).get(key);

const set = (key, value, reload) => {
  const params = new URLSearchParams(window.location.search);

  params.set(key, value);
  setSearchParams(params.toString(), reload);
};

const remove = (key, reload) => {
  const params = new URLSearchParams(window.location.search);

  params.delete(key);
  setSearchParams(params.toString(), reload);
};

export default (key) => ({
  get: () => get(key),
  set: (value, reload) => set(key, value, reload),
  remove: (reload) => remove(key, reload),
});

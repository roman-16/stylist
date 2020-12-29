export default {
  get: () => JSON.parse(localStorage.getItem('dataLayer')) ?? window.dataLayer,
  set: (dataLayer) => localStorage.setItem('dataLayer', JSON.stringify(dataLayer)),
};

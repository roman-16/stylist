import '@testing-library/jest-dom';
import fetch from 'node-fetch';
import createShopEnv from '@@/shared/createShopEnv';
import './mockServices';

// Add fetch
global.fetch = fetch;

// fetch.enableMocks();
createShopEnv.replace();

// mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  disconnect() {
    return null;
  }

  observe() {
    return null;
  }

  takeRecords() {
    return null;
  }

  unobserve() {
    return null;
  }
};

// mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  disconnect() {
    return null;
  }

  observe() {
    return null;
  }

  unobserve() {
    return null;
  }
};

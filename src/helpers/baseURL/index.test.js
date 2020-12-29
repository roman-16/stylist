import baseURL from '.';

describe('baseURL', () => {
  it('checks if env variable BASE_URL is defined', () => {
    expect(baseURL()).toBe(true);
  });

  it('returns a full url', () => {
    const url = new URL(baseURL.getPathname('/test'));

    expect(url.pathname).toBe('/test');
    expect(typeof url.host).toBe('string');
  });

  it('returns a full url with locale', () => {
    const url = new URL(baseURL.getPathname('/test', true));

    expect(url.pathname).toBe('/en-AT/test');
    expect(typeof url.host).toBe('string');
  });
});

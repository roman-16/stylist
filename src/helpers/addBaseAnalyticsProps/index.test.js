import addBaseAnalyticsProps from '.';

describe('addBaseAnalyticsProps', () => {
  it('prefixes the object keys with data-', () => {
    expect(
      addBaseAnalyticsProps({
        action: 1,
        test: 'test',
      }),
    ).toMatchObject({
      'data-action': 1,
      'data-test': 'test',
    });
  });

  it('adds default values to the object', () => {
    expect(
      addBaseAnalyticsProps({
        action: 1,
      }),
    ).toEqual({
      className: 'track-click',
      'data-action': 1,
      'data-category': 'home',
    });
  });

  it('lets you overwrite the default values', () => {
    expect(
      addBaseAnalyticsProps({
        action: 1,
        className: 'test',
        category: 'test2',
      }),
    ).toEqual({
      'data-action': 1,
      className: 'test',
      'data-category': 'test2',
    });
  });
});

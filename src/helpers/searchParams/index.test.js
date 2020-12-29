import searchParams from '.';

describe('searchParams', () => {
  it('sets a new search-param', () => {
    const testParam = searchParams('test1');

    testParam.set('bla');
    expect(testParam.get()).toBe('bla');
  });

  it('removes a search-param', () => {
    const testParam = searchParams('test3');

    testParam.set('bla');
    testParam.remove();
    expect(testParam.get()).toBeNull();
  });

  describe('window.location.search manipulation', () => {
    beforeAll(() => {
      delete window.location;
      window.location = {
        search: '',
      };
    });

    afterEach(() => {
      window.location.search = '';
    });

    it('sets a new search-param and reloads the site', () => {
      const testParam = searchParams('test2');

      testParam.set('bla', true);
      expect(testParam.get()).toBe('bla');
      expect(window.location.search).toBe('test2=bla');
    });

    it('removes a search-param and reloads the size', () => {
      const testParam = searchParams('test4');

      delete window.location;
      window.location = {
        search: '',
      };

      testParam.set('bla');
      testParam.remove();
      expect(testParam.get()).toBeNull();
      expect(window.location.search).toBe('');
    });
  });
});

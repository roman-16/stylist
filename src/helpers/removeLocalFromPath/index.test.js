import removeLocalFromPath from '.';

describe('removeLocalFromPath', () => {
  it('removes the first part of the path', () => {
    expect(removeLocalFromPath('/de-at/test')).toBe('test');
    expect(removeLocalFromPath('/bla/test1')).toBe('test1');
  });
});

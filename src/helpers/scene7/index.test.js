import scene7 from '.';

describe('scene7', () => {
  it('removes the first part of the path', () => {
    expect(
      scene7.addParams('http://localhost/test.png', {
        preset: '1',
        width: 10,
        height: 20,
        fit: 'crop',
        align: 'center',
      }),
    ).toBe('http://localhost/test.png?$1$&wid=10&hei=20&fit=crop&align=center');
  });
});

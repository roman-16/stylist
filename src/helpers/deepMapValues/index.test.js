import deepMapValues from '.';

describe('deepMapValues', () => {
  it('deep maps an object', () => {
    deepMapValues(
      {
        a: 1,
        b: {
          c: 2,
          d: {
            e: 3,
          },
        },
      },
      (...args) => expect(args).toMatchSnapshot(),
    );
  });
});

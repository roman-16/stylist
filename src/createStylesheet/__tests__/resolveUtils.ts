import resolveUtils from '../resolveUtils';

it('resolves custom utils', () => {
  const utils = resolveUtils(({ variants }) => ({
    f: (value) => ({ font: value }),
    size: variants({
      big: { height: '100px' },
      small: { height: '10px' },
    }),
  }));

  expect(utils?.f('Arial')).toStrictEqual({ font: 'Arial' });
  expect(utils?.size('big')).toStrictEqual({ height: '100px' });
  expect(utils?.size('small')).toStrictEqual({ height: '10px' });
});

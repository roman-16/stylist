/* eslint-disable no-template-curly-in-string */
import resolveTemplate from '.';

describe('resolveTemplate', () => {
  it('returns a resolved string', () => {
    expect(resolveTemplate('Hello ${world}!', { world: 'world' })).toBe('Hello world!');
  });
});

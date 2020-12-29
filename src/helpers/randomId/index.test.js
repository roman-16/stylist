import randomId from '.';

describe('randomId', () => {
  // Set default value for random
  jest.spyOn(Math, 'random').mockReturnValue(0.123456789);

  it('creates a random string id', () => {
    expect(randomId()).toBe('r-0-123456');
    expect(randomId()).toBe('r-1-123456');
  });

  it('creates a random number', () => {
    expect(randomId.number()).toBe(123456002);
    expect(randomId.number()).toBe(123456003);
  });
});

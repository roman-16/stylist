import betterTry from '.';

describe('betterTry', () => {
  it('returns the error in a readable way', () => {
    const [response, error] = betterTry(() => {
      throw new Error('error');
    });

    expect(response).toBeUndefined();
    expect(error.message).toBe('error');
  });

  it('works with async functions', async () => {
    const [response, error] = await betterTry(async () => {
      throw new Error('error');
    });

    expect(response).toBeUndefined();
    expect(error.message).toBe('error');
  });
});

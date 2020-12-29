import { setTimeout } from '@@jest/helpers';
import cache from '.';

describe('cache', () => {
  it('caches a value for 1 second', async () => {
    const testCache = cache('test1');

    testCache.set(true, 1);
    expect(testCache.get()).toBe(true);

    await setTimeout(1000);

    expect(testCache.get()).toBeUndefined();
  });

  it('removes a cached value', () => {
    const testCache = cache('test2');

    testCache.set(true);
    expect(testCache.get()).toBe(true);
    testCache.remove();

    expect(testCache.get()).toBeUndefined();
  });

  it('removes all cached values', () => {
    const testCache1 = cache('test3');
    const testCache2 = cache('test4');

    testCache1.set(true);
    testCache2.set(true);
    expect(testCache1.get()).toBe(true);
    expect(testCache2.get()).toBe(true);
    cache.clear();

    expect(testCache1.get()).toBeUndefined();
    expect(testCache2.get()).toBeUndefined();
  });
});

import { describe, expect, test } from 'vitest';

import { getData, API } from './getData.js';

describe('getData()', () => {
  test('should throw an error if status is not ok', async () => {
    const fake_API = 'https://invalid-api/.invalid';

    const resultFn = async () => await getData(fake_API);

    expect(resultFn).rejects.toThrow();
  });

  test('should return an object with status 200 property', async () => {
    const resultExpected = { status: 200 };

    const result = await getData(API);

    expect(result).toEqual(expect.objectContaining(resultExpected));
  });

  test('should return an object with a body property that has a length greater than 0', async () => {
    const { body } = await getData(API);

    expect(body.length).toBeGreaterThan(0);
  });
});

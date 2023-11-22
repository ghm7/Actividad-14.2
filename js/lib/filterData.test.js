import { describe, expect, test } from 'vitest';

import { getData, API } from './getData.js';
import { filterData } from './filterData.js';

const apiData = await getData(API);
const data = apiData.body;

describe('filterData()', () => {
  test('should throw error if first parameter is not a string', () => {
    const resultFn = () => filterData();

    expect(resultFn).toThrow('First parameter must be a string');
  });

  test('should throw error if second parameter is not an array', () => {
    const input = 'search';
    const str = 'string';
    const obj = {};
    const num = 1;
    const bool = false;

    const resultFnStr = () => filterData(input.toLowerCase(), str);
    const resultFnObj = () => filterData(input.toLowerCase(), obj);
    const resultFnNum = () => filterData(input.toLowerCase(), num);
    const resultFnBool = () => filterData(input.toLowerCase(), bool);

    expect(resultFnStr).toThrow('Second parameter must be an array');
    expect(resultFnObj).toThrow('Second parameter must be an array');
    expect(resultFnNum).toThrow('Second parameter must be an array');
    expect(resultFnBool).toThrow('Second parameter must be an array');
  });

  test('should throw error if the array is empty', () => {
    const input = 'string';
    const arr = [];

    const resultFn = () => filterData(input.toLowerCase(), arr);

    expect(resultFn).toThrow('The array cannot be empty');
  });

  test('should throw error if the array does not provide the specific keys', () => {
    const input = 'search';
    const exampleArray = [
      {
        name: 'First name',
        property2: 'Another property',
      },
    ];

    const resultFn = () => filterData(input.toLowerCase(), exampleArray);

    expect(resultFn).toThrow(
      'The object in the array does not provide the right key values'
    );
  });

  test('should return an empty array if the input is empty', () => {
    const input = '';

    const result = filterData(input.toLowerCase(), data);

    expect(result).toEqual([]);
  });

  test('should filter by title', () => {
    const input = 'lion';

    const result = filterData(input.toLowerCase(), data);

    const expectedResult = data.filter(({ title }) =>
      title.toLowerCase().includes(input.toLowerCase())
    );
    expect(result).toEqual(expect.arrayContaining(expectedResult));
  });

  test('should filter by overview', () => {
    const input = 'lion';

    const result = filterData(input.toLowerCase(), data);

    const expectedResult = data.filter(({ overview }) =>
      overview.toLowerCase().includes(input.toLowerCase())
    );
    expect(result).toEqual(expect.arrayContaining(expectedResult));
  });

  test('should filter by tagline', () => {
    const input = 'lion';

    const result = filterData(input.toLowerCase(), data);

    const expectedResult = data.filter(({ tagline }) =>
      tagline.toLowerCase().includes(input.toLowerCase())
    );
    expect(result).toEqual(expect.arrayContaining(expectedResult));
  });

  test('genres should be an array', () => {
    const input = 'lion';

    const result = filterData(input.toLowerCase(), data);

    const expectedTypeOfProperty = Array;
    expect(result[0].genres).toBeInstanceOf(expectedTypeOfProperty);
  });

  test('should filter by genres', () => {
    const input = 'lion';

    const result = filterData(input.toLowerCase(), data);

    const expectedResult = data.filter(({ genres }) =>
      genres.some(({ name }) => name.toLowerCase() === input.toLowerCase())
    );
    expect(result).toEqual(expect.arrayContaining(expectedResult));
  });
});

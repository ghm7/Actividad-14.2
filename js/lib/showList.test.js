import { describe, expect, test } from 'vitest';

import {
  showList,
  renderGroupList,
  calculateStars,
  renderStars,
  setOffcanvasContent,
} from './showList.js';

describe('showList()', () => {
  test('throw error if first parameter is not an array', () => {
    const resultFn = () => showList();

    expect(resultFn).toThrow('The first parameter must be an array');
  });

  test('throw error if second parameter is not an HTMLElement', () => {
    const array = [1, 2, 3];
    const DOMElement = 'invalid';

    const resultFn = () => showList(array, DOMElement);

    expect(resultFn).toThrow();
  });
});

describe('renderGroupList()', () => {
  test('should return a string', () => {
    const array = [];

    const result = renderGroupList(array);

    expect(result).toBeTypeOf('string');
  });
});

describe('calculateStars()', () => {
  test('should throw an error if the parameter is not a number', () => {
    const paramObj = {};
    const paramArr = [];
    const paramBool = false;
    const paramStr = 'invalid-string';

    const resultFnObj = () => calculateStars(paramObj);
    const resultFnArr = () => calculateStars(paramArr);
    const resultFnBool = () => calculateStars(paramBool);
    const resultFnStr = () => calculateStars(paramStr);

    expect(resultFnObj).toThrow('The parameter must be a string or a number');
    expect(resultFnArr).toThrow('The parameter must be a string or a number');
    expect(resultFnBool).toThrow('The parameter must be a string or a number');
    expect(resultFnStr).toThrow('The parameter must be a string or a number');
  });

  test('should return the half of the score', () => {
    const score = 8.9;

    const result = calculateStars(score);

    const expectedResult = Math.round(score / 2);
    expect(result).toEqual(expectedResult);
  });

  test('should return a number', () => {
    const score = 10;

    const result = calculateStars(score);

    expect(result).toBeTypeOf('number');
  });
});

describe('renderStars()', () => {
  test('should throw an error if the parameter provided is not a number', () => {
    const parameter = 'invalid';

    const resultFn = () => renderStars(parameter);

    expect(resultFn).toThrow('The parameter provided must be a number');
  });

  test('should return a string', () => {
    const parameter = 5;

    const result = renderStars(parameter);

    expect(result).toBeTypeOf('string');
  });
});

describe('setOffcanvasContent()', () => {
  test('should throw an error if the first parameter provided is not a number', () => {
    const id = 'invalid';
    // Need spy.on to create a fake dom element

    const resultFn = () => setOffcanvasContent(id);

    expect(resultFn).toThrow('The first parameter provided must be a number');
  });

  // Need to test if the function throws an error when the second parameter
  // is not an HTMLElement

  test('should throw an error if the third parameter provided is not an array', () => {
    const id = 12;
    const DOMElement = 'WIP';
    const data = 'invalid';

    const resultFn = () => setOffcanvasContent(id, DOMElement, data);

    expect(resultFn).toThrow(
      'The third parameter provided must be an instance of array'
    );
  });
});

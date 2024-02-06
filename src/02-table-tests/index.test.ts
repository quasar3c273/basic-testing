// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 10, b: 2, action: Action.Divide, expected: 5 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 1, b: 2, action: 'invalid', expected: null },
  { a: 'invalid', b: 2, action: Action.Add, expected: null },
  { a: 2, b: 'invalid', action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)('test simpleCalculator table', (testCase) => {
    const result = simpleCalculator({
      a: testCase.a,
      b: testCase.b,
      action: testCase.action,
    });
    expect(result).toBe(testCase.expected);
  });
});

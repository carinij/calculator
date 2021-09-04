const calc = require('../server/logic/calc.js');

test("returns given value if there's nothing to evaluate", () => {
  const input = '3456';
  expect(calc(input)).toBe(input);
});

describe('gives expected answers to example strings from spec', () => {
  test('1 + 2', () => {
    const input = '1 +2';
    expect(calc(input)).toEqual('3');
  });
  test('4*5/2', () => {
    const input = '4*5/2';
    expect(calc(input)).toEqual('10');
  });
  test('-5+-8--11*2', () => {
    const input = '-5+-8--11*2';
    expect(calc(input)).toEqual('9');
  });
  test('-.32         /.5', () => {
    const input = '-.32         /.5';
    expect(calc(input)).toEqual('-0.64');
  });
  test('(4-2)*3.5', () => {
    const input = '(4-2)*3.5';
    expect(calc(input)).toEqual('7');
  });
});

describe('gives expected answers to strings with increasingly more parentheses', () => {
  test('(1 + 2)4', () => {
    const input = '(1 + 2)4';
    expect(calc(input)).toEqual('12');
  });
  test('(4*5)/((2*3)--1)', () => {
    const input = '(4*5)/((2*3)--1)';
    expect(calc(input)).toEqual('2.857142857142857');
  });
  test('(((((230-43)+3(234))/2)+2)*9000)', () => {
    const input = '(((((230-43)+3(234))/2)+2)*9000)';
    expect(calc(input)).toEqual('4018500');
  });
});

describe('handles arithmetic with decimals better than stock javascript', () => {
  test('0.2 + 0.1', () => {
    const input = '0.2 + 0.1';
    expect(calc(input)).toEqual('0.3');
  });
  test('0.3 / 0.2', () => {
    const input = '0.3 / 0.2';
    expect(calc(input)).toEqual('1.5');
  })

})

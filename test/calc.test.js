const calc = require('../server/logic/calc.js');

describe('basic stuff', () => {
  test('returns given value if there\'s nothing to evaluate', () => {
    const input = '3456';
    expect(calc(input)).toBe(input);
  });
})

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
  test('parentheses', () => {
    const input = '(1 + 2)4';
    expect(calc(input)).toEqual('12');
  });
  test('some nested parentheses', () => {
    const input = '(4*5)/((2*3)--1)';
    expect(calc(input)).toEqual('2.857142857142857');
  });
  test('lots of parentheses', () => {
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
  });

})

describe('handles special cases', () => {
  test('very big results', () => {
    const input = '999999999999999999999 * 9999999999999999999';
    expect(calc(input).slice(0, 5)).toEqual('Error');
  });
  test('lots of post-decimal digits', () => {
    const input = '0.99999999999999999999 * 0.9999999999999999999';
    expect(calc(input).slice(0, 5)).not.toEqual('Error');
  })
  test('divison by 0', () => {
    let input = '9/0';
    expect(calc(input).slice(0, 5)).toEqual('Error');
    input = '47/(8-4-4)';
    expect(calc(input).slice(0, 5)).toEqual('Error');
  })
})

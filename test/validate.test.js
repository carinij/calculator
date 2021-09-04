const valF = require('../server/logic/validate.js');

test('accepts valid input strings', () => {
  let inputArray = [
    '3+4',
    '5-2',
    '5*8',
    '100/10',
    '345*981',
    '645238.2425/236.3535',
    '(2+3)',
    '34(2*89456)',
    '(((34*9)3+3(33/247))3-879)+12.6/255'
  ]
  inputArray.map((item) => {
    expect(valF(item).outcome).toBe(true);
  })
})


test('rejects very long input strings', () => {
  let input = '';
  for (let i = 0; i < 1000; i++) {
    input+="9";
  }
  expect(valF(input).outcome).toBe(false);
})

test('does not allow more than 2 operators in series', () => {
  let input = '6+--8';
  expect(valF(input).outcome).toBe(false);
})

test('does not allow 2 operators when the second is not "-"', () => {
  let input = '3++4';
  expect(valF(input).outcome).toBe(false);
})

test('does allow 2 operators when the second is "-"', () => {
  let input = '3+-1';
  expect(valF(input).outcome).toBe(true);
})

test('does not allow letters as input', () => {
  let input = '3x+1';
  expect(valF(input).outcome).toBe(false);
})

test('does not allow starting string with an operator other than "-"', () => {
  let input ='*48+2';
  expect(valF(input).outcome).toBe(false);
}


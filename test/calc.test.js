const calc = require('../server/logic/calc.js');

test("returns given value if there's nothing to evaluate", () => {
  const formula = '3456';
  expect(calc(formula)).toBe(formula);
})
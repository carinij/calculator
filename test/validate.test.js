const validate = require("../server/logic/validate.js");

describe("basic rejection cases", () => {
  test("rejects very long input strings", () => {
    let input = "";
    for (let i = 0; i < 1000; i++) {
      input += "9";
    }
    expect(validate(input).outcome).toBe(false);
  });
  test("does not allow letters as input", () => {
    const input = "3x+1";
    expect(validate(input).outcome).toBe(false);
  });
  test("rejects invalid example strings from spec", () => {
    const inputArray = ["2+-+-4", "19 + cinnamon"];
    inputArray.map((item) => {
      expect(validate(item).outcome).toBe(false);
    });
  });
});

describe("tests related to operators", () => {
  test("does not allow more than 2 operators in series", () => {
    const input = "6+--8";
    expect(validate(input).outcome).toBe(false);
  });
  test('does not allow 2 operators when the second is not "-"', () => {
    const input = "3++4";
    expect(validate(input).outcome).toBe(false);
  });
  test('does allow 2 operators when the second is "-"', () => {
    const input = "3+-1";
    expect(validate(input).outcome).toBe(true);
  });
  test('does not allow starting string with an operator other than "-"', () => {
    const inputArray = [
      "+1 + 2",
      "*4*5/2",
      "/5+-8--11*2",
      "*-.32         /.5/",
      "+(4-2)*3.5",
    ];
    inputArray.map((item) => {
      expect(validate(item).outcome).toBe(false);
    });
  });
  test("does not allow ending string with an operator", () => {
    const inputArray = [
      "1 + 2-",
      "4*5/2+",
      "-5+-8--11*2*",
      "-.32         /.5/",
      "(4-2)*3.5-",
    ];
    inputArray.map((item) => {
      expect(validate(item).outcome).toBe(false);
    });
  });
});

describe("tests related to decimal points", () => {
  test("does not allow multiple decimal points in a number", () => {
    const input = "3.456.52";
    expect(validate(input).outcome).toBe(false);
  });
  test("does not allow two or more decimal points in a row", () => {
    const input = "3..52";
    expect(validate(input).outcome).toBe(false);
  });
});

describe("tests related to parentheses", () => {
  test("allows valid parentheses usage", () => {
    const inputArray = [
      "(2+3)",
      "(2)",
      "3(2)",
      "((2+3)3 + 3*3) / 2(2*4)",
      "(((((230-43)+3(234))/2)+2)*9000)",
      "3+(4+5)+6",
    ];
    inputArray.map((item) => {
      expect(validate(item).outcome).toBe(true);
    });
  });
  test("rejects invalid parentheses usage", () => {
    const inputArray = [
      ")(2+3)",
      "2)3",
      "3(2)3",
      "((2+3)3 + 3*3 / 2(2*4)",
      "(((((230-43)+3(234)/2)+2)*9000)",
      "23()+3",
    ];
    inputArray.map((item) => {
      expect(validate(item).outcome).toBe(false);
    });
  });
});

describe("accepts valid strings", () => {
  test("accepts valid example strings from spec", () => {
    const inputArray = [
      "1 + 2",
      "4*5/2",
      "-5+-8--11*2",
      "-.32         /.5",
      "(4-2)*3.5",
    ];
    inputArray.map((item) => {
      expect(validate(item).outcome).toBe(true);
    });
  });
  test("accepts other valid input strings", () => {
    const inputArray = [
      "3+4",
      "5-2",
      "5*8",
      "100/10",
      "345*981",
      "645238.2425/236.3535",
      "(2+3)",
      "34(2*89456)",
      "(((34*9)3+3(33/247))3-879)+12.6/255",
    ];
    inputArray.map((item) => {
      expect(validate(item).outcome).toBe(true);
    });
  });
});

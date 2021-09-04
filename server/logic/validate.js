function validate(str) {

  // Get rid of white spaces
  const newStr = str.replace(/\s/g, "");

  // Usually servers balk at query strings greater than 1024; that seems like a reasonable limit to set.
  // We'll need to encode / and + with three-character hex ASCII codes, so in theory our query could be
  // just under twice as long as the input (input can't start with an operator other than - and can't
  // end with any operators). But we'll need a little more space for a property name etc. Perhaps slightly
  // awkward that we're stripping the whitespace first, but I don't expect it to come up too often.
  if (newStr.length > 500) {
    return {outcome: false, text: 'Please stay under 500 characters (excluding whitespace).'};
  }

  // ^ indicates beginning of string, and $ end of string; [] enclose all the characters to be matched;
  // + matches one or more of the preceding token; \ escapes
  // So this regex will return true in a test only if each character in the test's argument string
  // matches 0-9 or one of the other listed characters.
  const okCharsRegex = /^[0-9\+\-\*\/\(\)\.\s]+$/;
  if (!okCharsRegex.test(newStr)) {
    return {outcome: false, text: 'Please remove any characters other than digits 0-9, ".", "+", "-", "*", "/", "(", ")", and space.'};
  };

  // | means "or" and {3, } means "match three or more of the preceding token"
  // So this matches any of +-*/ followed by any of +*/ or three+ sequential characters from the set +-*/
  // or a . followed by any other non-number.
  const seriesOperatorsRegex = /[\+\*\/\-][\+\*\/]|[\+\*\/\-]{3,}|\.[\+\*\/\-\.\(\)]/;
  if (seriesOperatorsRegex.test(newStr)) {
    return {outcome: false, text: 'Please check for extraneous or missing operators or missing numbers.'};
  }

  // Checks to see if the string starts with one of +*/ or ends with one of +*/-
  const firstLastRegex = /^[\+\*\/]|[\+\*\/\-]$/;
  if (firstLastRegex.test(newStr)) {
    return {outcome: false, text: 'Please ensure the start and end are valid.'};
  }

  // Matches if there are two '.' in a row or two '.' in a number
  const decimalPointRegex = /\.[\d]*\./
  if (decimalPointRegex.test(newStr)) {
    return {outcome: false, text: 'Please make sure each number has no more than one decimal point, and two decimal points are never adjacent.'};
  }

  // Checks to make sure all ) are preceded by (, all ( are followed by ), and all parentheses
  // enclose something, and no set of parentheses neighbor numbers on both sides
  const checkParens = (inputStr) => {
    let openParens = 0;
    // Keep track of the start and ending indexes of each set of parentheses so we can check for
    // neighboring digits later
    let parensArray = [];
    for (let i = 0; i < inputStr.length; i++) {
      if (inputStr[i] === "(") {
        openParens++;
        parensArray.push({start: i, end: -1});
      } else if (inputStr[i] === ")") {
        openParens--;
        if (openParens < 0) {
          return {outcome: false, text: 'Please make sure to have an open parenthesis before each close one.'};
        };
        for (let j = parensArray.length - 1; j >= 0; j--) {
          if (parensArray[j].end === -1) {
            parensArray[j].end = i;
            break;
          }
        }
      }
    }
    if (openParens !== 0) {
      return {outcome: false, text: 'Please be sure to close all open parentheses.' }
    }
    for (let i = 0; i < parensArray.length; i++) {
      const current = parensArray[i];
      if (current.end - current.start === 1) {
        return {outcome: false, text: 'Please make sure that each set of parentheses enclose a statement.'};
      }
      // If our parentheses don't start at the beginning of the string or end at the end of the string...
      if (current.start !== 0 && current.end !== inputStr.length - 1) {
        // If they have both a number in front and a number behind, we should reject the input
        if (/\d\(/.test(inputStr.substring(current.start-1, current.start+1))
        && /\)\d/.test(inputStr.substring(current.end, current.end+2)))
        {
          return {outcome: false, text: 'Please make sure that each set of parentheses is next to only one number.'};
        }
      }
    }
    return {outcome: true};
  }

  const parensCheck = checkParens(newStr);
  if(parensCheck.outcome === false) {
    return {outcome: false, text: parensCheck.text};
  };

  // If we passed all those other tests, we're good
  return {outcome: true};
}

module.exports = validate;
function calc (inputString) {
  let result = inputString;
  // Add * between () and numbers or () and ()?

  function evaluate(str) {
    let newStr = str;

    // Matches if the entire string contains numbers and/or periods (only one
    // should be possible) and optionally a '-' to start
    // In other words: matches if we're done
    const finishedRegex = /^[-]*[0-9\.]+$/;
    if (finishedRegex.test(newStr)) {
      return newStr;
    }

    const parensIndex = newStr.indexOf('(');
    // If there's a '(' in there somewhere, sort that out
    if (parensIndex !== -1) {
      console.log("Evaluating parens.");
      newStr = resolveParens(newStr, parensIndex);
      // Call self on string, which now has one less set of parentheses
      return evaluate(newStr);
    }

    const mulIndex = newStr.indexOf('*');
    const divIndex = newStr.indexOf('/');
    if (mulIndex !== -1 || divIndex !== -1) {
      if (mulIndex >= 0 && mulIndex < divIndex) {
        newStr = applyOperator(newStr, mulIndex);
      } else {
        newStr = applyOperator(newStr, divIndex);
      }
    }

  }

  // Parentheses
  function resolveParens(str, initialIndex) {
    let newStr = str;
    let openParensIndex;
    for (let i = initialIndex; i < str.length; i++) {
      // The locally most deeply nested parenthetical is the one defined by the last open
      // parens and the first close parens; we can safely resolve it
      if (newStr[i] === '(') {
        openParensIndex = i;
      } else if (newStr[i] === ')') {
        if (openParensIndex > 0 && newStr[openParensIndex-1].match(/\d/)) {
          newStr = insert(newStr, openParensIndex, '*');
          openParensIndex++;
        } else if (i < newStr.length - 1 && newStr[i+1].match(/\d/)) {
          newStr = insert(newStr, i + 1, '*');
        }
        console.log("newStr after *ification: " + newStr);
        // Removes the parenthetical (including the parentheses themselves) and replaces it with
        // the result of evaluating the contents of the parenthetical (sans parentheses)
        return replace(newStr, openParensIndex, i + 1, evaluate(newStr.slice(openParensIndex + 1, i)));
      }
    }
  }

  function applyOperator(str, index) {
    let newString = str;
    const firstOperand = getNumber(newStr, index, -1);
    const secondOperand = getNumber(newStr, index, 1);
    return replace(newStr)
  }

  function getNumber(str, index, direction) {
     
  }

  function insert(str, index, newBit) {
    return str.slice(0, index) + newBit + str.slice(index);
  }

  function replace(str, startIndex, endIndex, newBit) {
    return str.slice(0, startIndex) + newBit + str.slice(endIndex);
  }

  result = evaluate(result);
  return result;

}

module.exports = calc;
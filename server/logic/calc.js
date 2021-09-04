const { getNumber, getSubIndex, getDecimalPlaces,  insert, replaceGroup } = require('./helpers');

function calc (inputString) {

  function evaluate(str) {
    let newStr = str;

    // If we're sending an error message (i.e. divide by 0 or something else that
    // made it through validation but is still causing an issue), pass it through
    if (newStr.slice(0, 5) === "Error") {
      return newStr;
    }

    // Matches if the entire string contains numbers and/or periods (only one
    // should be possible) and optionally a '-' to start
    // In other words: matches if we're done
    const finishedRegex = /^[-]*[0-9\.]+$/;
    if (finishedRegex.test(newStr)) {
      console.log("Finished with: " + newStr);
      return newStr;
    }

    // First, evaluate parentheses
    const parensIndex = newStr.indexOf('(');
    // If there's a '(' in there somewhere, sort that out
    if (parensIndex !== -1) {
      // console.log("Evaluating parens.");
      newStr = resolveParens(newStr, parensIndex);
      return evaluate(newStr);
    }

    // Next, evaluate multiplication and division, starting on the left
    const mulDiv = decideOperators(newStr.indexOf('*'), newStr.indexOf('/'));
    if (mulDiv) {return mulDiv};

    // Last, evaluate addition and subtraction, starting on the left
    const addSub = decideOperators(newStr.indexOf('+'), getSubIndex(newStr))
    if (addSub) {return addSub};

    // Whichever of the two operator indexes exists, or if both exist, whichever
    // is first (readying from the left), call applyOperator there
    function decideOperators(opIndex1, opIndex2) {
      if (opIndex1 !== -1) {
        if (opIndex2 !== -1) {
          newStr = applyOperator(newStr, opIndex1 < opIndex2 ? opIndex1 : opIndex2);
          return evaluate(newStr);
        } else {
          newStr = applyOperator(newStr, opIndex1);
          return evaluate(newStr);
        }
      } else if (opIndex2 !== -1) {
        newStr = applyOperator(newStr, opIndex2);
        return evaluate(newStr);
      }
    }

    return "Input string passed validation but could not be evaluated.";
  }

  function resolveParens(str, initialIndex) {
    let newStr = str;
    let openParensIndex;
    let modifier = 0;
    for (let i = initialIndex; i < str.length; i++) {
      // The locally most deeply nested parenthetical is the one defined by the last open
      // parens and the first close parens; we can safely resolve it
      if (newStr[i] === '(') {
        openParensIndex = i;
      } else if (newStr[i] === ')') {
        // If the ( has a digit next to the left, add a * before the (, to simplify things for
        // when we're parsing for multiplication later
        if (openParensIndex > 0 && newStr[openParensIndex-1].match(/\d/)) {
          newStr = insert(newStr, openParensIndex, '*');
          modifier+=1;
          // If the ) has a digit to the right, add a * after the ) and before the digit
        } else if (i < newStr.length - 1 && newStr[i+1].match(/\d/)) {
          newStr = insert(newStr, i + 1, '*');
        }
        // Remove the parenthetical (including the parentheses themselves) and replace it with
        // the result of evaluating the contents of the parenthetical (sans parentheses)
        newStr = replaceGroup(newStr, openParensIndex + modifier, i + modifier, evaluate(newStr.slice(openParensIndex + 1 + modifier, i + modifier)));
        return newStr;
      }
    }
  }

  function applyOperator(str, index) {
    let newStr = str;
    const firstOperand = getNumber(newStr, index, -1);
    const secondOperand = getNumber(newStr, index, 1);
    console.log("firstOperand: ", firstOperand);
    console.log("secondOperand: ", secondOperand);

    const firstMod = 10 * getDecimalPlaces(firstOperand.value) || 1;
    const secondMod = 10 * getDecimalPlaces(secondOperand.value) || 1;
    console.log("firstMod: ", firstMod);
    console.log("secondMod: ", secondMod);

    const modifier = firstMod > secondMod ? firstMod : secondMod;
    console.log("modifier: ", modifier);

    const firstVal = parseFloat(firstOperand.value) * modifier;
    console.log("firstVal", firstVal);
    const secondVal = parseFloat(secondOperand.value) * modifier;
    console.log("secondVal", secondVal);

    let result;
    switch (newStr[index]) {
      case '*':
        result = (firstVal * secondVal) / (modifier * modifier);
        break;
      case '/':
        result = (firstVal / secondVal);
        break;
      case '+':
        result = (firstVal + secondVal) / modifier;
        break;
      case '-':
        result = (firstVal - secondVal) / modifier;
        break;
      default:
        console.log("Default case reached on applyOperator.");
    }
    if (result === Infinity) {return "Error: Division by 0"};
    if (result.toString().indexOf('e') >= 0) {
      return "Error: Handling very large numbers with scientific notation is a premium feature."
    }
    console.log("applyOperator newStr: ", newStr);
    return replaceGroup(newStr, firstOperand.termIndex, secondOperand.termIndex, result);
  }

  // Actually run the thing! But remove whitespace and convert '--' to '+' first.
  return evaluate(inputString.replace(/\s/g, '').replace(/\-\-/, '+'));

}

module.exports = calc;
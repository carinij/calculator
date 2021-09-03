function calc (inputString) {

  function evaluate(str) {
    let newStr = str;

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
      console.log("Evaluating parens.");
      newStr = resolveParens(newStr, parensIndex);
      return evaluate(newStr);
    }

    // Next, evaluate multiplication and division, starting on the left
    const mulDiv = decideOperators(newStr.indexOf('*'), newStr.indexOf('/'));
    if (mulDiv) {return mulDiv};

    // Last, evaluate addition and subtraction, starting on the left
    const addSub = decideOperators(newStr.indexOf('+'), getSubIndex(newStr))
    if (addSub) {return addSub};

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
        newStr = replace(newStr, openParensIndex + modifier, i + modifier, evaluate(newStr.slice(openParensIndex + 1 + modifier, i + modifier)));
        return newStr;
      }
    }
  }

  function applyOperator(str, index) {
    let newStr = str;
    const firstOperand = getNumber(newStr, index, -1);
    const secondOperand = getNumber(newStr, index, 1);
    const firstVal = parseInt(firstOperand.value);
    const secondVal = parseInt(secondOperand.value);
    let result;
    switch (newStr[index]) {
      case '*':
        result = firstVal * secondVal;
        break;
      case '/':
        result = firstVal / secondVal;
        break;
      case '+':
        result = firstVal + secondVal;
        break;
      case '-':
        result = firstVal - secondVal;
        break;
      default:
        console.log("Default case reached on applyOperator.");
    }
    console.log("applyOperator newStr: ", newStr);
    return replace(newStr, firstOperand.termIndex, secondOperand.termIndex, result);
  }

  function getNumber(str, index, direction) {
    let resultArray = [];
    let operandIndex = index;
    if (direction === -1) {
      for (let i = index - 1; i >= 0; i--) {
        // If the char to the left is a digit or '.', add it to our results and continue
        // (improper decimal points won't make it past the earlier validation step)
        if(/[\d\.]/.test(str[i])) {
          resultArray.unshift(str[i]);
          operandIndex = i;
          // Handle the corner case of a negative number to the left of ()
          // (which we'll want to multiply)
        } else if (i <= index - 2 && /\-/.test(str[i]) && !/\d/.test(str[i-1])) {
          resultArray.unshift(str[i]);
          operandIndex = i;
          break;
          // As soon as we find a non-digit, stop looking
        } else {
          break;
        }
      }
    } else {
      for (let i = index + 1; i < str.length; i++) {
        // If the first character after the operator is a '-' and the next one is a digit,
        // add it to our result and continue
        if (i === index + 1 && /\-\d/.test(str[i] + str[i+1])) {
          resultArray.push(str[i]);
          operandIndex = i;
        // If the char to the right is a digit or '.', add it to our result and continue
        } else if(/[\d\.]/.test(str[i])) {
          resultArray.push(str[i]);
          operandIndex = i;
        } else {
          break;
        }
      }
    }
    console.log({value: resultArray.join(''), termIndex: operandIndex});
    return ({value: resultArray.join(''), termIndex: operandIndex});
  }

  // If the '-' we've found is between two digits, it means the subtraction operator and not
  // that something is negative; return its index
  function getSubIndex(str) {
    for (let i = 1; i < str.length - 1; i++) {
      console.log(str.slice(i-1, i+2));
      if (/\d\-\d/.test(str.slice(i-1, i+2))) {
        return i;
      }
    }
    return -1;
  }

  function insert(str, index, newBit) {
    return str.slice(0, index) + newBit + str.slice(index);
  }

  function replace(str, startIndex, endIndex, newBit) {
    console.log("replace: ");
    console.log("str: " + str);
    console.log("startIndex: " + startIndex);
    console.log("endIndex: " + endIndex);
    console.log("newBit: " + newBit);
    console.log("result: " + str.slice(0, startIndex) + newBit + str.slice(endIndex + 1));
    return str.slice(0, startIndex) + newBit + str.slice(endIndex + 1);
  }

  const result = evaluate(inputString);
  return result;

}

module.exports = calc;
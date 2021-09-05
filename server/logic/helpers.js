function getNumber(str, index, direction) {
  let resultArray = [];
  let operandIndex = index;
  if (direction === -1) {
    for (let i = index - 1; i >= 0; i--) {
      // If the char to the left is a digit or '.', add it to our results and continue
      // (improper decimal points won't make it past the earlier validation step)
      if (/[\d\.]/.test(str[i])) {
        resultArray.unshift(str[i]);
        operandIndex = i;
        // Handle the case of a negative number to the left of ()
        // (which we'll want to multiply)
      } else if (
        i <= index - 2 &&
        /\-/.test(str[i]) &&
        !/\d/.test(str[i - 1])
      ) {
        resultArray.unshift(str[i]);
        operandIndex = i;
        break;
        // As soon as we find a non-digit (and non-'-') stop looking
      } else {
        break;
      }
    }
  } else {
    for (let i = index + 1; i < str.length; i++) {
      // If the first character after the operator is a '-' and the next one is a digit,
      // include it in our result and continue
      if (i === index + 1 && /\-\d/.test(str[i] + str[i + 1])) {
        resultArray.push(str[i]);
        operandIndex = i;
        // If the char to the right is a digit or '.', add it to our result and continue
      } else if (/[\d\.]/.test(str[i])) {
        resultArray.push(str[i]);
        operandIndex = i;
        // When we run out of digits, stop looking
      } else {
        break;
      }
    }
  }
  return { value: resultArray.join(""), termIndex: operandIndex };
}

// Iterate over the string and find a digit followed by a '-' followed by a digit.
// (Because we're looking for a subtraction operator, not a minus sign)
function getSubIndex(str) {
  for (let i = 1; i < str.length - 1; i++) {
    if (/\d\-\d/.test(str.slice(i - 1, i + 2))) {
      return i;
    }
  }
  return -1;
}

function getDecimalPlaces(str) {
  if (str.indexOf(".") >= 0) {
    return str.split(".")[1].length;
  } else {
    return 0;
  }
}

// Returns a string with the new value shoved in there at index
function insert(str, index, newBit) {
  return str.slice(0, index) + newBit + str.slice(index);
}

// Returns a string with the new value replacing whatever used to be between
// startIndex and endIndex (inclusive--including writing over whatever is at
// startIndex and endIndex)
function replaceGroup(str, startIndex, endIndex, newBit) {
  return str.slice(0, startIndex) + newBit + str.slice(endIndex + 1);
}

module.exports = {
  getNumber,
  getSubIndex,
  getDecimalPlaces,
  insert,
  replaceGroup,
};

export default function calc (inputString) {
  let result = inputString;

  // Add * between () and numbers or () and ()

  function evaluate(str) {

  }


  // Parentheses
  function resolveParens(str) {
    let openParensIndex = "";
    for (let i = 0; i < str.length; i++) {
      if (str[i] === '(') {
        openParensIndex = i;
      } else if (str[i] === ')') {
        return evaluate(str.substring(i))
      }
    }
  }

  function multiplication(str) {

  }

  function addition(str) {

  }

}
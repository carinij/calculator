import React, { useState } from 'react';
import "./styles.css";

import ResultView from './components/resultView.jsx';
import InputView from './components/inputView.jsx';

const host = "localhost";
const port = "3000";

export default function Calculator () {

  const [resultDisplay, setResultDisplay] = useState("");

  const processFormula = (formula) => {
    const val = validateFormula(formula);
    if (val.outcome) {
      // Get rid of all whitespace
      let query = formula.replace(/\s/g, "");
      // Change / and + to their ASCII hex codes
      query = encodeURIComponent(query);
      fetch(`http://${host}:${port}/calc?formula=${query}`)
      .then(response => response.json())
      .then(data => updateResultDisplay(data.answer));
    } else {
      updateResultDisplay(val.text);
    }
  }

  const validateFormula = (str) => {

    // Usually servers balk at query strings greater than 1024; that seems like a reasonable limit to set.
    // We'll need to encode / and + with three-character hex ASCII codes, so in theory our query could be
    // just under twice as long as the formula (formulas can't start with an operator other than - and can't
    // end with any operators). But we'll need a little more space for a property name etc.
    if (str.length > 500) {
      return {outcome: false, text: 'Please stay under 500 characters.'};
    }

    // ^ indicates beginning of string, and $ end of string; [] enclose all the characters to be matched;
    // + matches one or more of the preceding token; \ escapes
    // So this regex will return true in a test only if each character in the test's argument string
    // matches 0-9 or one of the other listed characters.
    const okCharsRegex = /^[0-9\+\-\*\/\(\)\.\s]+$/;
    if (!okCharsRegex.test(str)) {
      return {outcome: false, text: 'Please remove any characters other than digits 0-9, ".", "+", "-", "*", "/", "(", ")", and space.'};
    };

    // | means "or" and {3, } means "match three or more of the preceding token"
    // So this matches any of +-*/ followed by any of +*/ or three+ sequential characters from the set +-*/
    // or a . followed by any other non-number.
    const seriesOperatorsRegex = /[\+\*\/\-][\+\*\/]|[\+\*\/\-]{3,}|\.[\+\*\/\-\.\(\)]/;
    if (seriesOperatorsRegex.test(str)) {
      updateResultDisplay('Please check for extraneous or missing operators or missing numbers.');
      return {outcome: false, text: 'Please check for extraneous or missing operators or missing numbers.'};
    }

    // Checks to see if the string starts with one of +*/ or ends with one of +*/-
    const firstLastRegex = /^[\+\*\/]|[\+\*\/\-]$/;
    if (firstLastRegex.test(str)) {
      return {outcome: false, text: 'Please make sure the start and end are valid.'};
    }

    // Checks to make sure all ) are preceded by (, and all ( are followed by )
    const checkParens = (inputStr) => {
      let openParens = 0;
      for (let i = 0; i < inputStr.length; i++) {
        if (inputStr[i] === "(") {
          openParens++;
        } else if (inputStr[i] === ")") {
          openParens--;
        }
        if (openParens < 0) {
          return false;
        }
      }
      if (openParens !== 0) {
        return false;
      }
      return true;
    }

    if(!checkParens(str)) {
      return {outcome: false, text: 'Please make sure your parentheses are correct.'};
    };

    // If we passed all those other tests, we're good
    return {outcome: true};
  }

  const updateResultDisplay = (str) => {
    let currentContent = str + "\n" + resultDisplay;
    setResultDisplay(currentContent);
  }

  return (
    <div className="app-container">
      <div className="content-container">
        <ResultView resultDisplay={resultDisplay} setResultDisplay={setResultDisplay}/>
        <InputView processFormula={processFormula} setResultDisplay={setResultDisplay}/>
      </div>
    </div>
  )
}
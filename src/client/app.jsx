import React, { useState } from 'react';
import "./styles.css";

import ResultView from './components/resultView.jsx';
import InputView from './components/inputView.jsx';

export default function Calculator () {

  const [resultDisplay, setResultDisplay] = useState("");

  const processFormula = (formula) => {
    console.log("Evaluating: " + formula);
    console.log(validateFormula(formula));
  }

  const validateFormula = (str) => {
    // ^ indicates beginning of string, and $ end of string; [] enclose all the characters to be matched; \ escapes
    // So this regex will return true in a test only if each character in the test's argument string
    // matches 0-9 or one of the other listed characters.
    const okCharsRegex = /^[0-9\+\-\*\/\(\)\.]+$/;
    if (!okCharsRegex.test(str)) {
      updateResultDisplay('Validation failed. Please remove any spaces or characters other than 0-9, ".", "+", "-", "*", "/".');
      return false;
    };

    // | means "or" and {3, } means "match three or more of the proceeding token"
    // So this matches any of +-*/ followed by +*\ or three+ sequential characters from the set +-*/
    const seriesOperatorsRegex = /[\+\*\/\-][\+\*\/]|[\+\*\/\-]{3,}/
    if (seriesOperatorsRegex.test(str)) {
      updateResultDisplay('Validation failed. Please check for extraneous operators or missing numbers.');
      return false;
    }

    // To do: check for starting or ending with operators

    // To do: check each open parens has a close parens

    return true;
  }

  const updateResultDisplay= (str) => {
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
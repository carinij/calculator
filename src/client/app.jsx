import React, { useState } from 'react';
import "./styles.css";

import ResultView from './components/resultView.jsx';
import InputView from './components/inputView.jsx';

// I don't love mixing require and import statements like this, or indeed sharing files between the
// client and the server at all. But I like validating at the client (to save network calls and
// theoretical server resources) and also at the server (so we could theoretically use the API
// separately from the client.) And I've decided that coming up with a more elegant solution to
// the classic "es6 and commonJS modules don't get along" problem is out of scope.
const validateFormula = require('../server/validateFormula.js');

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
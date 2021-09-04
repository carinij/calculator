import React, { useEffect, useState } from 'react';
import TextInput from './textInput.jsx';
import CalculatorButtons from './calculatorButtons.jsx';

export default function InputView(props) {

  const [inputDisplay, setInputDisplay] = useState("");

  const clickHandler = (e) => {
    e.preventDefault();
    // This click handler is attached to elements with ids "btn-" and then a value matching what we're displaying to the user
    // By taking everything from character 4 on, "target" is being set to that value
    const target = e.target.id.substring(4);
    let currentInput;

    switch (target) {
      case "AC":
        setInputDisplay("");
        break;
      case "del":
        currentInput = inputDisplay.substring(0, inputDisplay.length-1);
        setInputDisplay(currentInput);
        break;
      case "=":
        props.processMathString(inputDisplay);
        break;
      default:
        currentInput = inputDisplay + target;
        setInputDisplay(currentInput);
    }
  }

  return (
    <div className="input-view-container">
      <TextInput inputDisplay={inputDisplay} setInputDisplay={setInputDisplay} setResultDisplay={props.setResultDisplay}/>
      <CalculatorButtons clickHandler={clickHandler}/>
    </div>
  )
}
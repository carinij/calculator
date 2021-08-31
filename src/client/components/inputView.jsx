import React from 'react';
import TextInput from './textInput.jsx';
import CalculatorButtons from './calculatorButtons.jsx';

export default function InputView(props) {
  return (
    <div className="input-view-container">
      <TextInput />
      <CalculatorButtons />
    </div>
  )
}
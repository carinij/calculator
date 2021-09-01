import React from 'react';

export default function CalculatorButtons(props) {

  const buttonNameArray = ['+', '-', '*',  '/', '7', '8', '9', 'AC', '4', '5', '6', 'del', '1', '2', '3', '.', '0', '(', ')', '='];

  const buttons = buttonNameArray.map((item) =>
    <button key={"btn-" + item} id={"btn-" + item} className="calculator-button" onClick={props.clickHandler}>{item}</button>
  )

  return (
    <div className="calculator-buttons-container">
      { buttons }
    </div>
  )
}
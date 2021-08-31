import React from 'react';

export default function CalculatorButtons(props) {

  const buttonDisplayArray = ['+', '-', '*',  '/', '7', '8', '9', 'AC', '4', '5', '6', 'del', '1', '2', '3', '.', '0', '='];
  const buttonNameArray = ['plus', 'minus', 'times', 'divide', 'seven', 'eight', 'nine', 'AC', 'four', 'five', 'six', 'del', 'one', 'two', 'three', 'dot', 'zero', 'equals'];
  let buttonInfoArray = [];

  for (let i = 0; i < buttonDisplayArray.length; i++) {
    buttonInfoArray.push({displayName: buttonDisplayArray[i], name: buttonNameArray[i]});
  }

  const buttons = buttonInfoArray.map((item) =>
    <button key={"btn-" + item.name} id={"btn-" + item.name} className="calculator-button">{item.displayName}</button>
  )

  return (
    <div className="calculator-buttons-container">
      { buttons }
    </div>
  )
}
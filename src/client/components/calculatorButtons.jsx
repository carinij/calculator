import React from 'react';

export default function CalculatorButtons(props) {

  const buttonDisplayArray = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.', 'del', 'AC', '/', '*', '-', '+', '='];
  const buttonNameArray = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'zero', 'dot', 'del', 'AC', 'division', 'multiplication', 'minus', 'plus', 'equals'];
  let buttonInfoArray = [];
  for (let i = 0; i < buttonDisplayArray.length; i++) {
    buttonInfoArray.push({displayName: buttonDisplayArray[i], name: buttonNameArray[i]});
  }

  const buttons = buttonInfoArray.map((item) =>
    <button key={item.name} id={item.name}>{item.displayName}</button>
  )

  return (
    <div className="calculator-buttons-container">
      { buttons }
    </div>
  )
}
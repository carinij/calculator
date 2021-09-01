import React from 'react';

export default function ResultView(props) {

  const clickHandler = (e) => {
    e.preventDefault();
    props.setResultDisplay("");
  }

  return (
    <div className="result-view-container">
      <textarea id="result-view" name="result-view" placeholder="Results will be displayed here" value={props.resultDisplay} readOnly onClick={clickHandler}></textarea>
      <button className="btn-clear-history">Clear History</button>
    </div>
  )
}
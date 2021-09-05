import React from "react";

export default function ResultView(props) {
  const clickHandler = (e) => {
    e.preventDefault();
    props.setResultDisplay("");
  };

  return (
    <div className="result-view-container">
      <textarea
        id="result-view"
        name="result-view"
        placeholder="Results"
        value={props.resultDisplay}
        readOnly
      ></textarea>
      <div className="clear-button-container">
        <button
          className="btn-clear-history btn-right-tab"
          onClick={clickHandler}
        >
          Clear History
        </button>
      </div>
    </div>
  );
}

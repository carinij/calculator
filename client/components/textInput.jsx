import React from "react";

export default function TextInput(props) {
  const handleChange = (e) => {
    e.preventDefault();
    props.setInputDisplay(e.target.value);
  };

  const clickHandler = (e) => {
    e.preventDefault();
    // This click handler is attached to elements with ids "btn-mode-" and then a value corresponding
    // to different modes used in App. Set "target" to that value by taking the string starting at
    // index 9.
    const target = e.target.id.substring(9);
    props.setEqualsMode(target);
  };

  const clearButtonClass =
    props.equalsMode === "clear"
      ? "btn-selected btn-right-tab"
      : "btn-right-tab";
  const keepButtonClass =
    props.equalsMode === "keep"
      ? "btn-selected btn-right-tab"
      : "btn-right-tab";
  const replaceButtonClass =
    props.equalsMode === "replace"
      ? "btn-selected btn-right-tab"
      : "btn-right-tab";

  return (
    <div>
      <input
        type="text"
        id="text-input"
        name="text-input"
        placeholder="Expression"
        value={props.inputDisplay}
        onChange={handleChange}
      />
      <div className="tab-menu-container">
        <div className="text-input-button-label">Mode: </div>
        <button
          id="btn-mode-clear"
          className={clearButtonClass}
          onClick={clickHandler}
        >
          Clear
        </button>
        <button
          id="btn-mode-keep"
          className={keepButtonClass}
          onClick={clickHandler}
        >
          Keep
        </button>
        <button
          id="btn-mode-replace"
          className={replaceButtonClass}
          onClick={clickHandler}
        >
          Replace
        </button>
      </div>
    </div>
  );
}

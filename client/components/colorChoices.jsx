import React from "react";

export default function ColorChoices(props) {
  const colorList = [
    "pink-blue",
    "pinks",
    "red-orange",
    "sky",
    "teals",
    "greens",
    "blues",
    "purple-teal",
    "dark-blues",
  ];

  const colors = colorList.map((item) => {
    return (
      <div
        key={item}
        className={`color-choice ${item}`}
        onClick={props.colorClickHandler}
      ></div>
    );
  });

  return <div className="color-choices-container">{colors}</div>;
}

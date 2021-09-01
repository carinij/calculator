import React, { useState } from 'react';

export default function TextInput(props) {

  const handleChange = (e) => {
    e.preventDefault();
    props.setInputDisplay(e.target.value);
  }

  return (
    <div>
      <input type="text" id="text-input" name="text-input" placeholder="Enter formula" value={props.inputDisplay} onChange={handleChange}/>
    </div>
  )
}
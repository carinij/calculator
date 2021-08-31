import React, { useState } from 'react';
import "./styles.css";

import ResultView from './components/resultView.jsx';
import InputView from './components/inputView.jsx';

export default function Calculator () {
  return (
    <div className="app-container">
      <div className="content-container">
        <ResultView />
        <InputView />
      </div>
    </div>
  )
}
import React from 'react';

export default function ResultView(props) {
  return (
    <div className="result-view-container">
      <textarea id="result-view" name="result-view" placeholder="Results will be displayed here." readOnly></textarea>
    </div>
  )
}
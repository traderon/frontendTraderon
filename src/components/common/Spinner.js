import React from "react";
import "./Spinner.css";

export default function Spinner() {
  return (
    <div className="loading-container">
      <div className="loading"></div>
      <div id="loading-text">Traderon</div>
    </div>
  );
}

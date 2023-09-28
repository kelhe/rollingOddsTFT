import React from "react";
import "../App.css"
function AlreadyOut({ handleChange, formData }) {
  return (
    <div className="d-flex">
      <label htmlFor="alreadyOut">How many of this unit is already out?</label>
      <input
        className="numberInput"
        type="number"
        id="alreadyOut"
        name="alreadyOut"
        min="0"
        max="29" //changes with set need to change to use variables from data in utils/rerollchances.js
        onChange={handleChange}
        value={formData.alreadyOut}
        required
      />
    </div>
  );
}

export default AlreadyOut;

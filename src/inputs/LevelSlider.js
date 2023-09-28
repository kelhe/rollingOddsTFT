import React from "react";

function LevelSlider({ handleChange, formData }) {
  return (
    <div>
      <label htmlFor="level">Level : {formData.level} <br/>
      <input
        type="range"
        id="level"
        name="level"
        list="levelMarkers"
        min={1}
        max={10}
        onChange={handleChange}
        value={formData.level}
      />
      <datalist id={"levelMarkers"}>
        <option value={1}></option>
        <option value={2}></option>
        <option value={3}></option>
        <option value={4}></option>
        <option value={5}></option>
        <option value={6}></option>
        <option value={7}></option>
        <option value={8}></option>
        <option value={9}></option>
        <option value={10}></option>
      </datalist>
      </label>
    </div>
  );
}

export default LevelSlider;

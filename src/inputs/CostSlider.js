import React from "react";

function CostSlider({ handleChange, formData }) {
  return (
    <div>
      <label htmlFor="cost">
        What cost unit are you rolling for? <br/>
        <div className="d-flex">
          <input
            type="range"
            id="cost"
            name="cost"
            list="costMarkers"
            min={1}
            max={5}
            onChange={handleChange}
            value={formData.cost}
          />
          <div className="mx-2">{formData.cost}</div>
        </div>
        <datalist id={"costMarkers"}>
          <option value={1}></option>
          <option value={2}></option>
          <option value={3}></option>
          <option value={4}></option>
          <option value={5}></option>
        </datalist>
      </label>
    </div>
  );
}

export default CostSlider;

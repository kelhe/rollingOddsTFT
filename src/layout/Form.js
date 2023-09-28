import React from "react";
import LevelSlider from "../inputs/LevelSlider";
import CostSlider from "../inputs/CostSlider";
import AlreadyOut from "../inputs/AlreadyOut";
import SameCostOut from "../inputs/SameCostOut";
import GoldToRoll from "../inputs/GoldToRoll";

function Form({handleSubmit,handleChange,formData}) {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <LevelSlider handleChange={handleChange} formData={formData} />
        <CostSlider handleChange={handleChange} formData={formData} />
        <AlreadyOut handleChange={handleChange} formData={formData} />
        <SameCostOut handleChange={handleChange} formData={formData} />
        <GoldToRoll handleChange={handleChange} formData={formData} />
        <div>
          <button type="submit">Get Odds</button>
        </div>
      </form>
    </div>
  );
}

export default Form;

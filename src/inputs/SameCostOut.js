import React from "react";
import "../App.css"
function SameCostOut({handleChange, formData}){
    return (
        <div>
            <label htmlFor="sameCostOut">How many units of the same cost already out?</label>
            <input
            className="numberInput"
            type="number"
            id="sameCostOut"
            name="sameCostOut"
            min="0"
            onChange={handleChange}
            value={formData.sameCostOut}
            required
            />
        </div>
    )
}

export default SameCostOut
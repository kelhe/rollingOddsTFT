import React from "react";
import "../App.css"

function GoldToRoll({handleChange, formData}){
    return (
        <div>
            <label htmlFor="goldToRoll">How much gold are you rolling with?</label>
            <input
            className="numberInput"
            type="number"
            id="goldToRoll"
            name="goldToRoll"
            min="2"
            onChange={handleChange}
            value={formData.goldToRoll}
            required
            />
        </div>
    )
}

export default GoldToRoll
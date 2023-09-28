import React, {useState} from "react";
import Form from "./Form";
import Result from "./Result";
import { chance } from "../utils/rerollChances";

function Layout(){
    const intialFormData = {
        level: 1,
        cost: 1,
        alreadyOut: 0,
        sameCostOut: 0,
        goldToRoll: 0,
      };
      const [formData, setFormData] = useState(intialFormData);
      const [probArr, setProbArr] = useState([])

      const handleChange = ({ target }) => {
        setFormData({
          ...formData,
          [target.name]: Number(target.value),
        });
      };

    const handleSubmit = async (event) => {
        try {
          event.preventDefault();
          let prob = await chance(formData);
          setProbArr(prob)
        } catch (error) {
          console.error(error);
        }
      };
    
    return (
        <div>
            <Form handleSubmit={handleSubmit} handleChange={handleChange} formData={formData}/>
            <Result probArr={probArr}/>
        </div>
    )
}

export default Layout
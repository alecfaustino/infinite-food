import { useState } from "react";
import { cuisines, diets, intolerances } from "../data/filterOptions";
import "../styles/Filters.css";

const Filters = ({ className }) => {
  const [selectedCuisine, setSelectedCuisine] = useState("");
  const [selectedDiets, setSelectedDiets] = useState([]);
  const [selectedIntolerances, setSelectedIntolerances] = useState([]);
  const [proteinRange, setProteinRange] = useState([0, 250]);
  const [calorieRange, setCalorieRange] = useState([0, 1000]);
  const [carbRange, setCarbRange] = useState([0, 250]);
  const [fatRange, setFatRange] = useState([0, 250]);

  const toggleSelection = (value, selectedArray, setSelectedArray) => {
    if (selectedArray.includes(value)) {
      setSelectedArray(selectedArray.filter((item) => item !== value));
    } else {
      setSelectedArray([...selectedArray, value]);
    }
  };

  const handleMinChange = (e) => {
    const newMin = Math.min(Number(e.target.value), proteinRange[1]);
    setProteinRange([newMin, proteinRange[1]]);
  };

  const handleMaxChange = (e) => {
    const newMax = Math.max(Number(e.target.value), proteinRange[0]);
    setProteinRange([proteinRange[0], newMax]);
  };

  return (
    <div className={className}>
      <h3>Search Filters</h3>

      <label htmlFor="cuisine">Cuisine</label>
      <select
        id="cuisine"
        value={selectedCuisine}
        onChange={(e) => setSelectedCuisine(e.target.value)}>
        <option value="">Any</option>
        {cuisines.map((cuisine) => (
          <option key={cuisine} value={cuisine}>
            {cuisine}
          </option>
        ))}
      </select>

      <h4>Diets</h4>
      {diets.map((diet) => (
        <div key={diet}>
          <input
            type="checkbox"
            id={`diet-${diet}`}
            checked={selectedDiets.includes(diet)}
            onChange={() =>
              toggleSelection(diet, selectedDiets, setSelectedDiets)
            }
          />
          <label htmlFor={`diet-${diet}`}>{diet}</label>
        </div>
      ))}

      <h4>Intolerances</h4>
      {intolerances.map((intolerance) => (
        <div key={intolerance}>
          <input
            type="checkbox"
            id={`intolerance-${intolerance}`}
            checked={selectedIntolerances.includes(intolerance)}
            onChange={() =>
              toggleSelection(
                intolerance,
                selectedIntolerances,
                setSelectedIntolerances
              )
            }
          />
          <label htmlFor={`intolerance-${intolerance}`}>{intolerance}</label>
        </div>
      ))}

      <div className="macronutrient-slider">
        <h4>Max Calories Per Serving</h4>
        <input
          type="range"
          min={0}
          max={2000}
          step={1}
          value={calorieRange[1]}
          onChange={(e) => setCalorieRange([0, Number(e.target.value)])}
        />
        <div className="macronutrient-values">
          <span>0g</span>
          <span>{calorieRange[1]}g</span>
        </div>
      </div>
      <div className="macronutrient-slider">
        <h4>Max Protein Per Serving (g)</h4>
        <input
          type="range"
          min={0}
          max={500}
          step={1}
          value={proteinRange[1]}
          onChange={(e) => setProteinRange([0, Number(e.target.value)])}
        />
        <div className="macronutrient-values">
          <span>0g</span>
          <span>{proteinRange[1]}g</span>
        </div>
      </div>
      <div className="macronutrient-slider">
        <h4>Max Carbs Per Serving (g)</h4>
        <input
          type="range"
          min={0}
          max={500}
          step={1}
          value={carbRange[1]}
          onChange={(e) => setCarbRange([0, Number(e.target.value)])}
        />
        <div className="macronutrient-values">
          <span>0g</span>
          <span>{carbRange[1]}g</span>
        </div>
      </div>
      <div className="macronutrient-slider">
        <h4>Max Fat Per Serving (g)</h4>
        <input
          type="range"
          min={0}
          max={500}
          step={1}
          value={fatRange[1]}
          onChange={(e) => setFatRange([0, Number(e.target.value)])}
        />
        <div className="macronutrient-values">
          <span>0g</span>
          <span>{fatRange[1]}g</span>
        </div>
      </div>
    </div>
  );
};

export default Filters;

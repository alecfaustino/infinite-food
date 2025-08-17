import React, { useState } from "react";
import "../styles/Filters.css";

const Filters = ({ className }) => {
  const cuisines = [
    "African",
    "Asian",
    "American",
    "British",
    "Cajun",
    "Caribbean",
    "Chinese",
    "Eastern European",
    "European",
    "French",
    "German",
    "Greek",
    "Indian",
    "Irish",
    "Italian",
    "Japanese",
    "Jewish",
    "Korean",
    "Latin American",
    "Mediterranean",
    "Mexican",
    "Middle Eastern",
    "Nordic",
    "Southern",
    "Spanish",
    "Thai",
    "Vietnamese",
  ];

  const diets = [
    "Gluten Free",
    "Ketogenic",
    "Vegetarian",
    "Lacto-Vegetarian",
    "Ovo-Vegetarian",
    "Vegan",
    "Pescetarian",
    "Paleo",
    "Primal",
    "Low FODMAP",
    "Whole30",
  ];

  const intolerances = [
    "Dairy",
    "Egg",
    "Gluten",
    "Grain",
    "Peanut",
    "Seafood",
    "Sesame",
    "Shellfish",
    "Soy",
    "Sulfite",
    "Tree Nut",
    "Wheat",
  ];

  const [selectedCuisine, setSelectedCuisine] = useState("");
  const [selectedDiets, setSelectedDiets] = useState([]);
  const [selectedIntolerances, setSelectedIntolerances] = useState([]);

  const toggleSelection = (value, selectedArray, setSelectedArray) => {
    if (selectedArray.includes(value)) {
      setSelectedArray(selectedArray.filter((item) => item !== value));
    } else {
      setSelectedArray([...selectedArray, value]);
    }
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
    </div>
  );
};

export default Filters;

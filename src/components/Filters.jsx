import { useState } from "react";
import { cuisines, diets, intolerances } from "../data/filterOptions";
import "../styles/Filters.css";

const Filters = ({
  className,
  setFilters,
  filters,
  setActiveFilters,
  handleSearch,
}) => {
  const handleCuisineChange = (e) => {
    setFilters((prev) => ({ ...prev, cuisine: e.target.value }));
  };

  // handlers for multi-select checkboxes
  const toggleArrayFilter = (key, value) => {
    setFilters((prev) => {
      const array = prev[key] || [];
      const updated = array.includes(value)
        ? array.filter((v) => v !== value)
        : [...array, value];
      return { ...prev, [key]: updated };
    });
  };

  // handler for maxProtein slider
  const handleMaxCalorieChange = (e) => {
    setFilters((prev) => ({ ...prev, maxCalories: Number(e.target.value) }));
  };

  // handler for maxProtein slider
  const handleMaxProteinChange = (e) => {
    setFilters((prev) => ({ ...prev, maxProtein: Number(e.target.value) }));
  };

  // handler for maxProtein slider
  const handleMaxCarbsChange = (e) => {
    setFilters((prev) => ({ ...prev, maxCarbs: Number(e.target.value) }));
  };

  // handler for maxProtein slider
  const handleMaxFatsChange = (e) => {
    setFilters((prev) => ({ ...prev, maxFat: Number(e.target.value) }));
  };

  return (
    <div className={className}>
      <h3>Search Filters</h3>

      <label htmlFor="cuisine">Cuisine</label>
      <select
        id="cuisine"
        value={filters.cuisine}
        onChange={handleCuisineChange}>
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
            checked={filters.diet?.includes(diet)}
            onChange={() => toggleArrayFilter("diet", diet)}
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
            checked={filters.intolerances?.includes(intolerance)}
            onChange={() => toggleArrayFilter("intolerances", intolerance)}
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
          value={filters.maxCalories}
          onChange={handleMaxCalorieChange}
        />
        <div className="macronutrient-values">
          <span>0g</span>
          <span>{filters.maxCalories}g</span>
        </div>
      </div>
      <div className="macronutrient-slider">
        <h4>Max Protein Per Serving (g)</h4>
        <input
          type="range"
          min={0}
          max={500}
          step={1}
          value={filters.maxProtein}
          onChange={handleMaxProteinChange}
        />
        <div className="macronutrient-values">
          <span>0g</span>
          <span>{filters.maxProtein}g</span>
        </div>
      </div>
      <div className="macronutrient-slider">
        <h4>Max Carbs Per Serving (g)</h4>
        <input
          type="range"
          min={0}
          max={500}
          step={1}
          value={filters.maxCarbs}
          onChange={handleMaxCarbsChange}
        />
        <div className="macronutrient-values">
          <span>0g</span>
          <span>{filters.maxCarbs}g</span>
        </div>
      </div>
      <div className="macronutrient-slider">
        <h4>Max Fat Per Serving (g)</h4>
        <input
          type="range"
          min={0}
          max={500}
          step={1}
          value={filters.maxFat}
          onChange={handleMaxFatsChange}
        />
        <div className="macronutrient-values">
          <span>0g</span>
          <span>{filters.maxFat}g</span>
        </div>
      </div>

      {/* Button to apply filters - but it's sticky */}
      <div className="filters-actions">
        <button onClick={() => setActiveFilters(filters)}>Apply Filters</button>
      </div>
    </div>
  );
};

export default Filters;

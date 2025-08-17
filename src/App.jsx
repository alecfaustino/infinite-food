import { useState } from "react";
import "./App.css";
import Cards from "./components/Cards";
import Filters from "./components/Filters";
import RightColumn from "./components/RightColumn";

function App() {
  const [filters, setFilters] = useState({
    cuisine: "",
    diet: [],
    intolerances: [],
    maxCalories: 2000,
    maxProtein: 500,
    maxCarbs: 500,
    maxFat: 500,
  });

  const [activeFilters, setActiveFilters] = useState({}); // these are the ones actually applied

  return (
    <div className="app-container">
      <Filters
        setFilters={setFilters}
        filters={filters}
        className="left-column"
        setActiveFilters={setActiveFilters}
      />
      <Cards activeFilters={activeFilters} />
      <RightColumn className="right-column" />
    </div>
  );
}

export default App;

import { useState } from "react";
import "./App.css";
import Cards from "./components/Cards";
import Filters from "./components/Filters";
import RightColumn from "./components/RightColumn";

function App() {
  const handleSearch = () => {
    console.log("Searching with filters:", filters);
    // TODO: Actually call the API with the filters
  };
  const [filters, setFilters] = useState({
    cuisine: "",
    diet: [],
    intolerances: [],
    maxCalories: 2000,
    maxProtein: 500,
    maxCarbs: 500,
    maxFat: 500,
  });
  return (
    <div className="app-container">
      <Filters
        setFilters={setFilters}
        filters={filters}
        className="left-column"
        handleSearch={handleSearch}
      />
      <Cards setFilters={setFilters} />
      <RightColumn className="right-column" />
    </div>
  );
}

export default App;

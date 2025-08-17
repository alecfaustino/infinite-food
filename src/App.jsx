import { useState } from "react";
import "./App.css";
import Cards from "./components/Cards";
import Filters from "./components/Filters";
import RightColumn from "./components/RightColumn";

function App() {
  const [recipes, setRecipes] = useState([]);
  const handleSearch = async () => {
    try {
      const query = new URLSearchParams(filters).toString();
      // TODO CHANGE THE LOCALHOST SO IT'S NOT HARDCODED - PUT INTO .ENV
      const response = await fetch(
        `http://localhost:8080/api/spoon/search?${query}`
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
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

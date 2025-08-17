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
    maxCarbs: 500,
    maxProtein: 500,
    maxCalories: 2000,
    maxFat: 500,
  });
  return (
    <div className="app-container">
      <Filters setFilters={setFilters} className="left-column" />
      <Cards setFilters={setFilters} />
      <RightColumn className="right-column" />
    </div>
  );
}

export default App;

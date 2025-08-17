import { useState, useRef } from "react";
import "./App.css";
import Cards from "./components/Cards";
import Filters from "./components/Filters";
import Details from "./components/Details";
import axios from "axios";
import Navbar from "./components/Navbar";

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
  const [info, setInfo] = useState([]);
  const loadingRef = useRef(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  // fetching the api to load 10
  const fetchRecipe = async () => {
    loadingRef.current = true;
    try {
      const query = new URLSearchParams(activeFilters).toString();
      const fetchResult = await axios.get(
        `${baseUrl}/api/spoon/search?${query}`
      );
      setInfo((prev) => [...prev, ...fetchResult.data.data.results]);
      // fetchResult.data.data.results is the base array we are looping through this. Let's call each instance "food"
      // food.description or food.summary
      // food.diets is another array
      // food.cuisines is another array
      // food.readyInMinutes
      // food.servings
      // food.nutrition.ingredients is an array of objects that contains id, name, amount, unit, and nutrients
      // nutrients ^ is another array of objects that contains name (of the nutrient) amount, unit.
      // we want Carbohydrates, Protein, Calories, Fats
      // food.analyzedInsturctions is an array of objects containing name, and steps. Steps is an array of objects containing number (the step order), and step (which is the description of the step)
    } catch (error) {
      console.error(error);
    } finally {
      loadingRef.current = false;
    }
  };

  return (
    <>
      <Navbar />
      <div className="app-container">
        <Filters
          setFilters={setFilters}
          filters={filters}
          className="left-column"
          setActiveFilters={setActiveFilters}
        />
        <Cards
          activeFilters={activeFilters}
          fetchRecipe={fetchRecipe}
          info={info}
          setInfo={setInfo}
          loadingRef={loadingRef}
          setSelectedRecipe={setSelectedRecipe}
        />
        <Details
          className="right-column"
          info={info}
          selectedRecipe={selectedRecipe}
        />
      </div>
    </>
  );
}

export default App;

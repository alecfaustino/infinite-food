import { useState, useRef, useEffect } from "react";
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
  const [activeFilters, setActiveFilters] = useState({});
  const [info, setInfo] = useState([]);
  const loadingRef = useRef(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  // is for operating the overlays available on mobile - filters on hamburger
  // state stored here but handled in Navbar when clicking hamburger
  const [mobileFiltersVisible, setMobileFiltersVisible] = useState(false);
  // handling conditional rendering for mobile
  // defaults by evaluating if true or false on <= 1024px
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  // handle window resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1024);
    // mount the listener to the window
    window.addEventListener("resize", handleResize);
    // clean up remove the listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchRecipe = async () => {
    loadingRef.current = true;
    try {
      const query = new URLSearchParams(activeFilters).toString();
      const fetchResult = await axios.get(
        `${baseUrl}/api/spoon/search?${query}`
      );
      setInfo((prev) => [...prev, ...fetchResult.data.data.results]);
    } catch (error) {
      console.error(error);
    } finally {
      loadingRef.current = false;
    }
  };

  return (
    <>
      <Navbar
        mobileFiltersVisible={mobileFiltersVisible}
        setMobileFiltersVisible={setMobileFiltersVisible}
      />

      {/* Mobile Filters Overlay */}
      {mobileFiltersVisible && (
        <div className="mobile-filters-overlay">
          <Filters
            setFilters={setFilters}
            filters={filters}
            setActiveFilters={setActiveFilters}
            className="mobile-filters"
          />
          <button
            className="close-filters"
            onClick={() => setMobileFiltersVisible(false)}>
            ✕
          </button>
        </div>
      )}

      <div className="app-container">
        {/* Desktop Filters */}
        {!isMobile && (
          <Filters
            setFilters={setFilters}
            filters={filters}
            className="left-column"
            setActiveFilters={setActiveFilters}
          />
        )}

        <Cards
          activeFilters={activeFilters}
          fetchRecipe={fetchRecipe}
          info={info}
          setInfo={setInfo}
          loadingRef={loadingRef}
          setSelectedRecipe={setSelectedRecipe}
        />

        {/* Desktop Details Panel */}
        {!isMobile && (
          <Details
            className="right-column"
            info={info}
            selectedRecipe={selectedRecipe}
          />
        )}
      </div>

      {/* Mobile Details Modal */}
      {selectedRecipe && isMobile && (
        <div className="modal-overlay" onClick={() => setSelectedRecipe(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-modal"
              onClick={() => setSelectedRecipe(null)}>
              ✕
            </button>
            <Details selectedRecipe={selectedRecipe} />
          </div>
        </div>
      )}
    </>
  );
}

export default App;

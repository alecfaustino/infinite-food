import { useEffect, useRef } from "react";
import "../styles/Cards.css";

const Cards = ({ activeFilters, fetchRecipe, info, setInfo, loadingRef }) => {
  const lastCallRef = useRef(0);
  useEffect(() => {
    const handleScroll = () => {
      const now = Date.now();
      // throttle to prevent loading content too quickly
      if (now - lastCallRef.current < 200) return;
      lastCallRef.current = now;
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      if (scrollTop + windowHeight >= fullHeight - 100 && !loadingRef.current) {
        fetchRecipe();
      }
    };
    // on initial load, mount the scroll listener to the window object
    window.addEventListener("scroll", handleScroll);

    // when the activefilters change, reset the list
    setInfo([]);
    // initial fetch on initial load
    fetchRecipe();

    // cleanup function
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [activeFilters]);

  return (
    <>
      <div className="cards-container">
        {info.map((food) => {
          const altText = `image of ${food.title}`;
          return (
            <div className="card" key={food.id}>
              <img alt={altText} src={food.image} />
              <p>{food.title}</p>
              <p>Ready in {food.readyInMinutes} minutes</p>
              <p>Servings: {food.servings} servings</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Cards;

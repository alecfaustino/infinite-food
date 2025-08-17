import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../styles/Cards.css";

const Cards = ({ activeFilters }) => {
  const [info, setInfo] = useState([]);
  const loadingRef = useRef(false);
  const lastCallRef = useRef(0);
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
      console.log(fetchResult.data.data);
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

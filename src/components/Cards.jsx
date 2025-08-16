import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

const Cards = () => {
  const [info, setInfo] = useState([]);
  const loadingRef = useRef(false);
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  // functions

  // fetching the api to load 10
  const fetchRecipe = async () => {
    loadingRef.current = true;
    try {
      const fetchResult = await axios.get(`${baseUrl}/api/spoon/random10`);
      setInfo((prev) => [...prev, ...fetchResult.data.data.recipes]);
      loadingRef.current = false;
    } catch (error) {
      // change to meaningful error
      console.error(error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      if (scrollTop + windowHeight >= fullHeight - 100 && !loadingRef.current) {
        fetchRecipe();
      }
    };
    // on initial load, mount the scroll listener to the window object
    window.addEventListener("scroll", handleScroll);

    // initial fetch on initial load
    fetchRecipe();

    // cleanup function
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const infiniteScroll = () => {
    // how far down the page is loaded at the moment
    // the || is for older browsers that store the scroll position on <body>
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
  };

  return (
    <>
      <div>
        {info.map((food) => {
          const altText = `image of ${food.title}`;
          return (
            <div key={food.id}>
              <img alt={altText} src={food.image} />
              <p>{food.title}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Cards;

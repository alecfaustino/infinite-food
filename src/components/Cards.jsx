import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const Cards = () => {
  const [info, setInfo] = useState([]);
  // TODO add useState for loading
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const fetchResult = await axios.get(`${baseUrl}/api/spoon/random10`);
        setInfo(fetchResult.data.data.recipes);
      } catch (error) {
        // change to meaningful error
        console.error(error);
      }
    };

    fetchRecipe();
  }, []);
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

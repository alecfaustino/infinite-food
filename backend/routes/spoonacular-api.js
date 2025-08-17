import express from "express";
import axios from "axios";
// API Documentation: https://spoonacular.com/food-api/docs
const RECIPES_BASE_URL = "https://api.spoonacular.com/recipes";

const router = express.Router();
// fetch a single random recipe
router.get("/random", async (req, res) => {
  const apiKey = process.env.SPOON_API_KEY;
  try {
    const response = await axios.get(`${RECIPES_BASE_URL}/random`, {
      params: {
        apiKey,
      },
    });
    const data = response.data;

    res.status(200).json({ message: "Random recipe fetched: ", data });
  } catch (error) {
    console.error("Error fetching random recipe ", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

// fetch 10 random recipes

router.get("/random10", async (req, res) => {
  const apiKey = process.env.SPOON_API_KEY;
  try {
    const response = await axios.get(`${RECIPES_BASE_URL}/random`, {
      params: {
        apiKey,
        number: 10,
      },
    });
    const data = response.data;

    res.status(200).json({ message: "10 recipes fetched: ", data });
  } catch (error) {
    console.error("Error fetching random recipe ", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

// fetch with filters

router.get("/search", async (req, res) => {
  // add these params
  // addRecipeInformation true
  // addRecipeInstructions true
  // addRecipeNutrion true
  // sort "random"
});

export default router;

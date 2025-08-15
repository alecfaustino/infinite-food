import express from "express";
const router = express.Router();

import axios from "axios";

// fetch a single random recipe
router.get("/random", async (req, res) => {
  const apiKey = process.env.SPOON_API_KEY;
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/random`,
      {
        params: {
          apiKey,
        },
      }
    );
    const data = response.data;

    res.status(200).json({ message: "Random recipe fetched: ", data });
  } catch (error) {
    console.error("Error fetching random recipe ", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

export default router;

import "../styles/Details.css";

// selectedRecipe is a single element from the info array. It is an object
const Details = ({ selectedRecipe, className, mobileFiltersVisible }) => {
  if (!selectedRecipe) {
    return (
      <div className={`${className} placeholder`}>
        <p>Select a recipe you like to see more details!</p>
      </div>
    );
  }

  const {
    title,
    image,
    readyInMinutes,
    servings,
    diets,
    cuisines,
    nutrition,
    analyzedInstructions,
  } = selectedRecipe;

  // extract main nutrients
  const nutrients = {};
  if (nutrition?.nutrients) {
    // loop through each object
    nutrition.nutrients.forEach((nutrient) => {
      const name = nutrient.name.toLowerCase();
      // if the name value of the object === one of these, add to the nutrients object defined above with key name and the amount and unit as values.
      if (["calories", "protein", "carbohydrates", "fat"].includes(name)) {
        nutrients[name] = `${nutrient.amount} ${nutrient.unit}`;
      }
    });
  }

  return (
    <div className={className}>
      <h2>{title}</h2>
      <img src={image} alt={`Image of ${title}`} className="details-image" />
      <p className="stats">
        Ready in {readyInMinutes} minutes | Servings: {servings}
      </p>
      {diets?.length > 0 && <p className="stats">Diets: {diets.join(", ")}</p>}
      {cuisines?.length > 0 && (
        <p className="stats">Cuisines: {cuisines.join(", ")}</p>
      )}

      {nutrition?.ingredients.length > 0 && (
        <div>
          <h4>Ingredients:</h4>
          <ul>
            {nutrition.ingredients.map((ingredient, index) => (
              <li key={ingredient.id} className="test">
                {ingredient.name} {ingredient.amount} {ingredient.unit}
              </li>
            ))}
          </ul>
        </div>
      )}

      {nutrition?.nutrients && (
        <div className="nutrition">
          <h4>Nutrients:</h4>
          <ul>
            <li>Calories: {nutrients.calories || "N/A"}</li>
            <li>Protein: {nutrients.protein || "N/A"}</li>
            <li>Carbohydrates: {nutrients.carbohydrates || "N/A"}</li>
            <li>Fat: {nutrients.fat || "N/A"}</li>
          </ul>
        </div>
      )}

      {analyzedInstructions?.length > 0 && (
        <div className="instructions">
          <h4>Instructions:</h4>
          {analyzedInstructions.map((instructionObj, index) => (
            <div key={index}>
              {instructionObj.name && (
                <h5 className="test">{instructionObj.name}</h5>
              )}
              <ol>
                {instructionObj.steps.map((step) => (
                  <li key={step.number}>{step.step}</li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Details;

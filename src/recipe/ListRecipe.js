import React from "react";
import Recipe from "./recipe";

function ListRecipe({ recipes }) {
  return (
    <div className="listRecipe">
      {recipes.map((recipe, index) => (
        <Recipe className="recipe" key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}

export default ListRecipe;

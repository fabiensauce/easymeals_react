import React from "react";
import Recipe from "./Recipe";

function ListRecipe({
  recipes,
  toogleFavorite,
  addRecipeIntoPlanning,
  removeRecipeFromPlanning,
  deleteRecipe
}) {
  return (
    <div className="listRecipe">
      {recipes.map((recipe, index) => (
        <Recipe
          className="recipe"
          key={recipe.id}
          recipe={recipe}
          toogleFavorite={toogleFavorite}
          addRecipeIntoPlanning={addRecipeIntoPlanning}
          removeRecipeFromPlanning={removeRecipeFromPlanning}
          deleteRecipe={deleteRecipe}
        />
      ))}
    </div>
  );
}

export default ListRecipe;

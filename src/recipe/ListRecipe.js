import React from "react";
import Recipe from "./Recipe";

function ListRecipe({
  recipes,
  toogleFavorite,
  openModalPlanning,
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
          openModalPlanning={openModalPlanning}
          removeRecipeFromPlanning={removeRecipeFromPlanning}
          deleteRecipe={deleteRecipe}
        />
      ))}
    </div>
  );
}

export default ListRecipe;

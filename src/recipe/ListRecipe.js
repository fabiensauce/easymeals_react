import React from "react";
import Recipe from "./recipe";

function ListRecipe({ recipes, toogleFavorite, deleteRecipe }) {
  return (
    <div className="listRecipe">
      {recipes.map((recipe, index) => (
        <Recipe
          className="recipe"
          key={recipe.id}
          recipe={recipe}
          toogleFavorite={toogleFavorite}
          deleteRecipe={deleteRecipe}
        />
      ))}
    </div>
  );
}

export default ListRecipe;

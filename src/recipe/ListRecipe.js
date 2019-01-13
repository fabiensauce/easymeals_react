import React from "react";
import Recipe from "./Recipe";

function ListRecipe({
  recipes,
  toogleFavorite,
  openModalPlanning,
  removeRecipeFromPlanning,
  deleteRecipe,
  isIntoModal,
  changeNbPerson
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
          isIntoModal={isIntoModal}
          changeNbPerson={changeNbPerson}
        />
      ))}
    </div>
  );
}

export default ListRecipe;

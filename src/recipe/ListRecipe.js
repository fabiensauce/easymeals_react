import React from "react";
import SingleRecipe from "./SingleRecipe";

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
        <SingleRecipe
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

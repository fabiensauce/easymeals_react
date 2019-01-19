import React from "react";
import SingleRecipe from "./SingleRecipe";
import "./ListRecipe.scss";

function ListRecipe({
  recipes,
  toogleFavorite,
  openModalPlanning,
  removeRecipeOfPlanning,
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
          removeRecipeOfPlanning={removeRecipeOfPlanning}
          deleteRecipe={deleteRecipe}
          isIntoModal={isIntoModal}
          changeNbPerson={changeNbPerson}
        />
      ))}
    </div>
  );
}

export default ListRecipe;

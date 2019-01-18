import React from "react";

import "./ContainerRecipe.scss";
import ListRecipe from "./ListRecipe";
import Creation from "./creation/Creation";

function ContainerRecipe({
  cssPage,
  setCssPage,
  recipes,
  createRecipe,
  toogleFavorite,
  openModalPlanning,
  removeRecipeFromPlanning,
  deleteRecipe,
  isIntoModal
}) {
  if (cssPage !== "recipe") setCssPage("recipe");
  return (
    <div className="containerRecipe">
      <ListRecipe
        recipes={recipes}
        toogleFavorite={toogleFavorite}
        openModalPlanning={openModalPlanning}
        removeRecipeFromPlanning={removeRecipeFromPlanning}
        deleteRecipe={deleteRecipe}
        isIntoModal={isIntoModal}
      />
      <Creation createRecipe={createRecipe} />
    </div>
  );
}

export default ContainerRecipe;

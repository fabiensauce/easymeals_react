import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./ContainerRecipe.scss";
import ListRecipe from "./ListRecipe";
import CreationModule from "./CreationModule";

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
      <CreationModule createRecipe={createRecipe} />
    </div>
  );
}

export default ContainerRecipe;

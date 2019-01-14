import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./ContainerRecipe.scss";
import ListRecipe from "./ListRecipe";

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
      <div className="addRecipe" onClick={createRecipe}>
        <span className="addTxt">Add fake recipe</span>
        <span className="addBtn">
          <FontAwesomeIcon icon="plus-square" />
        </span>
      </div>
      <ListRecipe
        recipes={recipes}
        toogleFavorite={toogleFavorite}
        openModalPlanning={openModalPlanning}
        removeRecipeFromPlanning={removeRecipeFromPlanning}
        deleteRecipe={deleteRecipe}
        isIntoModal={isIntoModal}
      />
    </div>
  );
}

export default ContainerRecipe;

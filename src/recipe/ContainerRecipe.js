import React, { Component } from "react";

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
      <div className="btn" onClick={createRecipe}>
        create new recipe +
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

import React, { Component } from "react";

import "./ContainerRecipe.scss";
// import { FAKE_RECIPES } from "./data_recipe";
import ListRecipe from "./ListRecipe";

class ContainerRecipe extends Component {
  // state = {};
  // componentDidMount() {
  //   // console.log(" euuuhhh component did mount ??? ");
  // }
  render() {
    const {
      recipes,
      createRecipe,
      toogleFavorite,
      addRecipeIntoPlanning,
      removeRecipeFromPlanning,
      deleteRecipe
    } = this.props;
    return (
      <div className="containerRecipe">
        <div className="btn" onClick={createRecipe}>
          create new recipe +
        </div>
        <ListRecipe
          recipes={recipes}
          toogleFavorite={toogleFavorite}
          addRecipeIntoPlanning={addRecipeIntoPlanning}
          removeRecipeFromPlanning={removeRecipeFromPlanning}
          deleteRecipe={deleteRecipe}
        />
      </div>
    );
  }
}

export default ContainerRecipe;

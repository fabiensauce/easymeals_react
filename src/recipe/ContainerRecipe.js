import React, { Component } from "react";
import "./ContainerRecipe.scss";
import { FAKE_RECIPES } from "./data_recipe";
import ListRecipe from "./ListRecipe";

class ContainerRecipe extends Component {
  render() {
    return (
      <div className="containerRecipe">
        <ListRecipe recipes={FAKE_RECIPES} />
      </div>
    );
  }
}

export default ContainerRecipe;

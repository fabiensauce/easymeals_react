import React, { Component } from "react";
import _ from "lodash";

import "./ContainerRecipe.scss";
// import { FAKE_RECIPES } from "./data_recipe";
import ListRecipe from "./ListRecipe";
import Services from "../Services";

class ContainerRecipe extends Component {
  state = {
    recipes: []
  };

  componentDidMount() {
    console.log(" euuuhhh component did mount ??? ");
    // GET recipes
    Services.get("http://localhost:3004/recipes").then(dataRecipes => {
      this.setState({ recipes: dataRecipes });
    });
  }

  // Arrow fx for binding
  createRecipe = () => {
    const recipe = {
      name: "salade CESAR ",
      isFavorite: false,
      nbPerson: 14,
      ingredients: [
        { qty: 3, unit: "g", food: "butter" },
        { qty: 100, unit: "g", food: "flou" },
        { qty: 1, unit: "l", food: "milk" }
      ],
      description: "blablablak",
      steps: ["mix flour and eggs", "add slowly milk"]
    };
    Services.post("http://localhost:3004/recipes", recipe).then(
      createdRecipe => {
        this.setState({ recipes: [...this.state.recipes, createdRecipe] });
      }
    );
  };

  // Arrow fx for binding
  toogleFavorite = recipe => {
    recipe.isFavorite = !recipe.isFavorite;
    Services.put(`http://localhost:3004/recipes/${recipe.id}`, recipe).then(
      data => {
        let newRecipes = [...this.state.recipes];
        // WORKING without those two line below ...
        // let newRecipe = _.find(newRecipes, r => r.id === recipe.id);
        // newRecipe.isFavorite = recipe.isFavorite;
        this.setState({ recipes: newRecipes });
      }
    );
  };
  // Arrow fx for binding
  deleteRecipe = recipe => {
    Services.delete(`http://localhost:3004/recipes/${recipe.id}`).then(data => {
      let newRecipes = _.filter(this.state.recipes, r => r.id !== recipe.id);
      this.setState({ recipes: newRecipes });
    });
  };

  render() {
    return (
      <div className="containerRecipe">
        <div className="btn" onClick={this.createRecipe}>
          {" "}
          create new recipe +{" "}
        </div>
        <ListRecipe
          recipes={this.state.recipes}
          toogleFavorite={this.toogleFavorite}
          deleteRecipe={this.deleteRecipe}
        />
      </div>
    );
  }
}

export default ContainerRecipe;

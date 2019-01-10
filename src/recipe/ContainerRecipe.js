import React, { Component } from "react";
import "./ContainerRecipe.scss";
// import { FAKE_RECIPES } from "./data_recipe";
import ListRecipe from "./ListRecipe";
import Services from "../Services";

class ContainerRecipe extends Component {
  state = {
    recipes: []
  };

  componentDidMount() {
    Services.get("http://localhost:3004/recipes").then(dataRecipes => {
      this.setState({ recipes: dataRecipes });
    });

    // this.tryModifyRecipe();
  }

  createRecipe() {
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
  }
  updateRecipe(recipe) {
    Services.put(`http://localhost:3004/recipes/${recipe.id}`, recipe).then(
      data => {
        this.setState({ recipes: [...this.state.recipes, data] });
      }
    );
  }
  tryModifyRecipe() {
    fetch("http://localhost:3004/recipes/5", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: 5,
        name: "name modified!!!",
        isFavorite: false,
        nbPerson: 14,
        ingredients: [
          { qty: 3, unit: "g", food: "butter" },
          { qty: 100, unit: "g", food: "flou" },
          { qty: 1, unit: "l", food: "milk" }
        ],
        description: "blablablak",
        steps: ["mix flour and eggs", "add slowly milk"]
      })
    });
  }

  render() {
    return (
      <div className="containerRecipe">
        <div className="btn" onClick={() => this.createRecipe()}>
          {" "}
          create new recipe +{" "}
        </div>
        <ListRecipe recipes={this.state.recipes} />
      </div>
    );
  }
}

export default ContainerRecipe;

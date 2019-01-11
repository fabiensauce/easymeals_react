import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import _ from "lodash";

import "./AppRouter.scss";
import Home from "./home/Home.js";
import ContainerRecipe from "./recipe/ContainerRecipe.js";
import ContainerPlanning from "./planning/ContainerPlanning.js";
import Services from "./services/Services";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
library.add(fas, far);

class AppRouter extends Component {
  state = {
    recipes: []
  };
  componentDidMount() {
    console.log(" --AppRouter-- componentDidMount() ");

    Services.getRecipes().then(dataRecipes => {
      this.setState({ recipes: dataRecipes });
    });
  }

  // // Arrow fx for binding
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
    Services.createRecipe(recipe).then(newRecipe => {
      this.setState({ recipes: [...this.state.recipes, newRecipe] });
    });
  };
  // Arrow fx for binding
  toogleFavorite = recipe => {
    recipe.isFavorite = !recipe.isFavorite;
    Services.updateRecipe(recipe.id, recipe).then(data => {
      let newRecipes = [...this.state.recipes];
      // WORKING without those two line below ...
      // let newRecipe = _.find(newRecipes, r => r.id === recipe.id);
      // newRecipe.isFavorite = recipe.isFavorite;
      this.setState({ recipes: newRecipes });
    });
  };
  // Arrow fx for binding
  addRecipeIntoPlanning = recipe => {
    recipe.isIntoPlanning = true;
    Services.updateRecipe(recipe.id, recipe).then(data => {
      this.setState({ recipes: [...this.state.recipes] });
    });
  };
  // Arrow fx for binding
  removeRecipeFromPlanning = recipe => {
    recipe.isIntoPlanning = false;
    Services.updateRecipe(recipe.id, recipe).then(data => {
      this.setState({ recipes: [...this.state.recipes] });
    });
  };
  // Arrow fx for binding
  deleteRecipe = recipe => {
    Services.deleteRecipe(recipe.id).then(data => {
      let newRecipes = _.filter(this.state.recipes, r => r.id !== recipe.id);
      this.setState({ recipes: newRecipes });
    });
  };

  render() {
    return (
      <Router>
        <div className="appRouter">
          <ul className="nav">
            <li className="liEasyMeal">EasyMeals</li>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/recipe">Recipe</Link>
            </li>
            <li>
              <Link to="/planning">Planning</Link>
            </li>
          </ul>

          <div className="route">
            <Route exact path="/" component={Home} />
            <Route
              path="/recipe"
              render={props => (
                <ContainerRecipe
                  {...props}
                  recipes={this.state.recipes}
                  createRecipe={this.createRecipe}
                  toogleFavorite={this.toogleFavorite}
                  addRecipeIntoPlanning={this.addRecipeIntoPlanning}
                  removeRecipeFromPlanning={this.removeRecipeFromPlanning}
                  deleteRecipe={this.deleteRecipe}
                />
              )}
            />
            <Route path="/planning" component={ContainerPlanning} />
          </div>
        </div>
      </Router>
    );
  }
}

export default AppRouter;

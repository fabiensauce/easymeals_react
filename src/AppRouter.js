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
    recipes: [],
    meals_id: [],
    meals: [
      { id: 10, recipes: [] },
      { id: 11, recipes: [] },
      { id: 12, recipes: [] },
      { id: 13, recipes: [] },
      { id: 14, recipes: [] },
      { id: 15, recipes: [] },
      { id: 16, recipes: [] },

      { id: 20, recipes: [] },
      { id: 21, recipes: [] },
      { id: 22, recipes: [] },
      { id: 23, recipes: [] },
      { id: 24, recipes: [] },
      { id: 25, recipes: [] },
      { id: 26, recipes: [] }
    ]
  };
  componentDidMount() {
    Services.getRecipes().then(dataRecipes => {
      Services.getMeals().then(dataMeals_id => {
        const newMeals = this.mapMeals_withRecipes(dataMeals_id, dataRecipes);
        this.setState({
          recipes: dataRecipes,
          meals_id: dataMeals_id,
          meals: newMeals
        });
      });
    });
  }

  mapMeals_withRecipes(meals_id, recipes) {
    return _.map(meals_id, meal_id => {
      return {
        id: meal_id.id,
        recipes: _.map(meal_id.recipes, idRecipe =>
          _.find(recipes, r => r.id === idRecipe)
        )
      };
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
  deleteRecipe = recipe => {
    Services.deleteRecipe(recipe.id).then(data => {
      let newRecipes = _.filter(this.state.recipes, r => r.id !== recipe.id);
      this.setState({ recipes: newRecipes });
    });
  };

  // // Arrow fx for binding
  addRecipeIntoPlanning = (recipe, idMeal) => {
    recipe.isIntoPlanning = true;
    const { recipes, meals_id } = this.state;
    let newMeal_id = _.find(meals_id, meal_id => meal_id.id === idMeal);
    newMeal_id.recipes.push(recipe.id);
    const newMeals = this.mapMeals_withRecipes(meals_id, recipes);
    Services.updateRecipe(recipe.id, recipe).then(data => {
      Services.updateMeal(newMeal_id.id, newMeal_id).then(data => {
        this.setState({ recipes, meals_id, meals: newMeals });
      });
    });
  };
  // // Arrow fx for binding
  removeRecipeFromPlanning = recipe => {
    recipe.isIntoPlanning = false;
    const { recipes, meals_id } = this.state;
    let newMeal_id = _.find(meals_id, meal_id => {
      if (_.indexOf(meal_id.recipes, recipe.id) !== -1) {
        _.remove(meal_id.recipes, id => id === recipe.id);
        return true;
      } else return false;
    });
    const newMeals = this.mapMeals_withRecipes(meals_id, recipes);
    Services.updateRecipe(recipe.id, recipe).then(() => {
      Services.updateMeal(newMeal_id.id, newMeal_id).then(() => {
        this.setState({ recipes, meals_id, meals: newMeals });
      });
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
            <div />
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
            <Route
              path="/planning"
              render={props => (
                <ContainerPlanning {...props} meals={this.state.meals} />
              )}
            />
          </div>
        </div>
      </Router>
    );
  }
}

export default AppRouter;

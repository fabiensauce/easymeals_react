import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import _ from "lodash";

import "./AppRouter.scss";
import Home from "./home/Home.js";
import ContainerRecipe from "./recipe/ContainerRecipe.js";
import ContainerPlanning from "./planning/ContainerPlanning.js";
import Planning from "./planning/Planning";
import ListRecipe from "./recipe/ListRecipe";
import Services from "./services/Services";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import Modal from "react-modal";
library.add(fas, far);
Modal.setAppElement("#root");

// let obj = { 'name' : 'charlotte', age: 45, isUseful: 'no'}
// let { name, ...rest } = obj   // rest : {age: 45, isUseful: 'no'}}
// {
//   "nbPerson": {
//     "value": 4
//   },
//   "meals": [
//     { "id": 10, "recipes": [] },
//     { "id": 11,
//       "recipes": [
//         { "id": 5, "nbPerson": 10 ,
//         { "id": 4 }
//       ]
//     },

class AppRouter extends Component {
  state = {
    recipes: [],
    meals_db: [],
    meals: [],
    isModalPlanningOpen: false,
    isModalRecipeOpen: false,
    recipe_tmp: undefined,
    recipes_tmp: []
  };

  componentDidMount() {
    Services.getRecipes().then(dataRecipes => {
      Services.getMeals().then(dataMeals => {
        const newMeals = this._mapMeals_withRecipes(dataMeals, dataRecipes);
        this.setState({
          recipes: dataRecipes,
          meals_db: dataMeals,
          meals: newMeals
        });
      });
    });
  }

  ///////////////////////////////////////////
  /// UTILS FUNCTIONS
  ///////////////////////////////////////////

  _mapMeals_withRecipes(meals_db, recipes) {
    return meals_db.map(meal_db => ({
      id: meal_db.id,
      recipes: meal_db.recipes
        .map(idRecipe => recipes.find(r => r.id === idRecipe))
        .filter(recipe => recipe !== undefined)
    }));
  }

  _removeFromPlanning(recipes, meals_db, recipeToRemove) {
    let newMeal_db = meals_db.find(meal_db => {
      if (meal_db.recipes.indexOf(recipeToRemove.id) !== -1) {
        _.remove(meal_db.recipes, id => id === recipeToRemove.id);
        return true;
      } else return false;
    });
    // let newMeal_db = meals_db.find(meal_db => {
    //   meal_db.recipes.find(recipe => recipe.id === recipeToRemove.id)
    // })
    // _.remove(newMeal_db.recipes, id => id === recipeToRemove.id);

    const newMeals = this._mapMeals_withRecipes(meals_db, recipes);
    return { newMeals, newMeal_db };
  }
  _fakeRecipe() {
    return {
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
  }

  ///////////////////////////////////////////
  /// EVENTS
  ///////////////////////////////////////////

  /// FROM RECIPE
  ///////////////////////////////////////////

  // Arrow fx for binding
  createRecipe = () => {
    const recipe = this._fakeRecipe();
    Services.createRecipe(recipe).then(newRecipe => {
      this.setState({ recipes: [...this.state.recipes, newRecipe] });
    });
  };
  // Arrow fx for binding
  toogleFavorite = recipe => {
    recipe.isFavorite = !recipe.isFavorite;
    Services.updateRecipe(recipe.id, recipe).then(() => {
      this.setState({ recipes: this.state.recipes });
    });
  };

  // Arrow fx for binding
  deleteRecipe = recipe => {
    const { recipes, meals_db } = this.state;
    if (recipe.isIntoPlanning) {
      const { newMeals, newMeal_db } = this._removeFromPlanning(
        recipes,
        meals_db,
        recipe
      );
      const newRecipes = recipes.filter(r => r.id !== recipe.id);
      Services.deleteRecipe(recipe.id).then(() => {
        Services.updateMeal(newMeal_db.id, newMeal_db).then(() => {
          this.setState({ recipes: newRecipes, meals_db, meals: newMeals });
        });
      });
    } else {
      const newRecipes = recipes.filter(r => r.id !== recipe.id);
      Services.deleteRecipe(recipe.id).then(() => {
        this.setState({ recipes: newRecipes });
      });
    }
  };

  // Arrow fx for binding
  openModalPlanning = recipe => {
    this.setState({ isModalPlanningOpen: true, recipe_tmp: recipe });
  };

  // Arrow fx for binding
  removeRecipeFromPlanning = recipe => {
    const { recipes, meals_db } = this.state;
    const { newMeals, newMeal_db } = this._removeFromPlanning(
      recipes,
      meals_db,
      recipe
    );
    recipe.isIntoPlanning = false;
    Services.updateRecipe(recipe.id, recipe).then(() => {
      Services.updateMeal(newMeal_db.id, newMeal_db).then(() => {
        this.setState({ recipes, meals_db, meals: newMeals });
      });
    });
  };

  /// FROM MODAL_RECIPE (open from Planning)
  ///////////////////////////////////////////

  // Arrow fx for binding
  closeModalRecipe = meal => {
    this.setState({ isModalRecipeOpen: false });
  };
  // Arrow fx for binding
  removeRecipeFromPlanning_fromModalRecipe = recipe => {
    this.closeModalRecipe();
    this.removeRecipeFromPlanning(recipe);
  };

  /// FROM PLANNING
  ///////////////////////////////////////////

  // Arrow fx for binding
  openModalRecipe = meal => {
    if (meal.recipes.length > 0) {
      this.setState({
        isModalRecipeOpen: true,
        recipes_tmp: [...meal.recipes]
      });
    }
  };

  /// FROM MODAL_PLANNING (open from Recipe)
  ///////////////////////////////////////////

  // Arrow fx for binding
  closeModalPlanning = () => {
    this.setState({ isModalPlanningOpen: false });
  };

  // Arrow fx for binding
  mealPlanningChosen = meal => {
    this.closeModalPlanning();
    const recipe = this.state.recipe_tmp;
    recipe.isIntoPlanning = true;
    const { recipes, meals_db } = this.state;
    let newMeal_db = meals_db.find(meal_db => meal_db.id === meal.id);
    newMeal_db.recipes.push(recipe.id);
    const newMeals = this._mapMeals_withRecipes(meals_db, recipes);
    Services.updateRecipe(recipe.id, recipe).then(() => {
      Services.updateMeal(newMeal_db.id, newMeal_db).then(() => {
        this.setState({ recipes, meals_db, meals: newMeals });
      });
    });
  };

  ///////////////////////////////////////////
  /// EVENTS
  ///////////////////////////////////////////

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
                  openModalPlanning={this.openModalPlanning}
                  removeRecipeFromPlanning={this.removeRecipeFromPlanning}
                  deleteRecipe={this.deleteRecipe}
                />
              )}
            />
            <Route
              path="/planning"
              render={props => (
                <ContainerPlanning
                  {...props}
                  meals={this.state.meals}
                  onClickMeal={this.openModalRecipe}
                />
              )}
            />
          </div>

          <Modal
            isOpen={this.state.isModalPlanningOpen}
            shouldCloseOnOverlayClick={true}
            onRequestClose={this.closeModalPlanning}
            className="modal modalPlanning"
            overlayClassName="modalOverlay"
          >
            <Planning
              meals={this.state.meals}
              onClickMeal={this.mealPlanningChosen}
            />
          </Modal>
          <Modal
            isOpen={this.state.isModalRecipeOpen}
            shouldCloseOnOverlayClick={true}
            onRequestClose={this.closeModalRecipe}
            className="modal modalRecipe"
            overlayClassName="modalOverlay"
          >
            <ListRecipe
              recipes={this.state.recipes_tmp}
              toogleFavorite={this.toogleFavorite}
              removeRecipeFromPlanning={
                this.removeRecipeFromPlanning_fromModalRecipe
              }
              deleteRecipe={undefined}
            />
          </Modal>
        </div>
      </Router>
    );
  }
}

export default AppRouter;

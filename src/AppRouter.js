import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import _ from "lodash";

import "./AppRouter.scss";
import ContainerHome from "./home/ContainerHome.js";
import ContainerRecipe from "./recipe/ContainerRecipe.js";
import ContainerPlanning from "./planning/ContainerPlanning.js";
import Planning from "./planning/Planning";
import ListRecipe from "./recipe/ListRecipe";
import ContainerErrand from "./errand/ContainerErrand";
import Services from "./services/Services";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import Modal from "react-modal";
library.add(fas, far);
Modal.setAppElement("#root");

class AppRouter extends Component {
  state = {
    cssPage: "home",
    recipes: [],
    nbPerson: undefined,
    meals_db: [],
    meals: [],
    isModalPlanningOpen: false,
    isModalRecipeOpen: false,
    recipes_toDisplayModal: [],
    recipe_toAdd: undefined,
    idMeal_openModal: undefined
  };

  componentDidMount() {
    Services.getNbPerson().then(dataNbPerson => {
      Services.getRecipes().then(dataRecipes => {
        Services.getMeals().then(dataMeals => {
          const newMeals = this._computeMeals_from_meals_db(
            dataMeals,
            dataRecipes,
            dataNbPerson.value
          );
          this.setState({
            nbPerson: dataNbPerson.value,
            recipes: dataRecipes,
            meals_db: dataMeals,
            meals: newMeals
          });
        });
      });
    });
  }

  ///////////////////////////////////////////
  /// UTILS FUNCTIONS
  ///////////////////////////////////////////

  _computeMeals_from_meals_db(meals_db, stateRecipes, stateNbPerson) {
    const _computeRecipe_from_recipe_db = recipe_db => {
      let { nbPerson, ingredients, ...others } = stateRecipes.find(
        recipe => recipe.id === recipe_db.id
      );
      let newNbPerson = recipe_db.nbPerson || stateNbPerson;
      let newIngredients = ingredients.map(ingredient => {
        let { qty, ...others } = ingredient;
        let newQty = (qty * newNbPerson) / nbPerson;
        return { qty: Number(newQty.toFixed(1)), ...others };
      });
      return {
        nbPerson: newNbPerson,
        ingredients: newIngredients,
        ...others
      };
    };

    return meals_db.map(meal_db => ({
      id: meal_db.id,
      recipes: meal_db.recipes.map(_computeRecipe_from_recipe_db)
    }));
  }

  _removeFromPlanning(recipeRemove, meals_db) {
    let newMeal_db = meals_db.find(meal_db =>
      meal_db.recipes.find(recipe_db => recipe_db.id === recipeRemove.id)
    );
    _.remove(newMeal_db.recipes, recipe_db => recipe_db.id === recipeRemove.id);
    return newMeal_db;
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
  /// EVENTS - all Arrow fx for binding !
  ///////////////////////////////////////////

  setCssPage = cssPage => {
    this.setState({ cssPage });
  };

  /// FROM RECIPE
  ///////////////////////////////////////////

  createRecipe = () => {
    const recipe = this._fakeRecipe();
    Services.createRecipe(recipe).then(newRecipe => {
      this.setState({ recipes: [...this.state.recipes, newRecipe] });
    });
  };

  toogleFavorite = recipe => {
    recipe.isFavorite = !recipe.isFavorite;
    Services.updateRecipe(recipe.id, recipe).then(() => {
      this.setState({ recipes: this.state.recipes });
    });
  };

  deleteRecipe = recipe => {
    const { recipes, nbPerson: nbP, meals_db } = this.state;
    if (recipe.isIntoPlanning) {
      const newMeal_db = this._removeFromPlanning(recipe, meals_db);
      const newMeals = this._computeMeals_from_meals_db(meals_db, recipes, nbP);
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

  openModalPlanning = recipe => {
    this.setState({ isModalPlanningOpen: true, recipe_toAdd: recipe });
  };

  removeRecipeFromPlanning = recipe => {
    const { recipes, nbPerson: nbP, meals_db } = this.state;
    const newMeal_db = this._removeFromPlanning(recipe, meals_db);
    const newMeals = this._computeMeals_from_meals_db(meals_db, recipes, nbP);
    recipe.isIntoPlanning = false;
    Services.updateRecipe(recipe.id, recipe).then(() => {
      Services.updateMeal(newMeal_db.id, newMeal_db).then(() => {
        this.setState({ recipes, meals_db, meals: newMeals });
      });
    });
  };

  /// FROM MODAL_RECIPE (open from Planning)
  ///////////////////////////////////////////

  closeModalRecipe = meal => {
    this.setState({ isModalRecipeOpen: false });
  };

  _updateRecipe_db_nbPerson(recipeRemove, meals_db) {
    let newMeal_db = meals_db.find(meal_db =>
      meal_db.recipes.find(recipe_db => recipe_db.id === recipeRemove.id)
    );
    _.remove(newMeal_db.recipes, recipe_db => recipe_db.id === recipeRemove.id);
    return newMeal_db;
  }

  changeNbPersonMealRecipe = (newNb, recipe) => {
    const { recipes, meals_db, nbPerson: nbP, idMeal_openModal } = this.state;
    let newMeal_db = meals_db.find(meal_db => meal_db.id === idMeal_openModal);
    let recipe_db = newMeal_db.recipes.find(r_db => r_db.id === recipe.id);
    recipe_db.nbPerson = newNb;
    const newMeals = this._computeMeals_from_meals_db(meals_db, recipes, nbP);
    const meal_openModal = newMeals.find(meal => meal.id === idMeal_openModal);
    Services.updateMeal(newMeal_db.id, newMeal_db).then(() => {
      this.setState({
        meals_db,
        meals: newMeals,
        recipes_toDisplayModal: meal_openModal.recipes
      });
    });
  };

  removeRecipeFromPlanning_fromModalRecipe = recipe => {
    this.closeModalRecipe();
    this.removeRecipeFromPlanning(recipe);
  };

  /// FROM PLANNING
  ///////////////////////////////////////////

  changeNbPerson = newNb => {
    if (newNb <= 0) return;
    const { recipes, meals_db } = this.state;
    const newMeals = this._computeMeals_from_meals_db(meals_db, recipes, newNb);
    Services.updateNbPerson(newNb).then(() => {
      this.setState({ nbPerson: newNb, meals: newMeals });
    });
  };

  openModalRecipe = meal => {
    if (meal.recipes.length > 0) {
      this.setState({
        isModalRecipeOpen: true,
        recipes_toDisplayModal: meal.recipes,
        idMeal_openModal: meal.id
      });
    }
  };

  /// FROM MODAL_PLANNING (open from Recipe)
  ///////////////////////////////////////////

  closeModalPlanning = () => {
    this.setState({ isModalPlanningOpen: false });
  };

  mealPlanningChosen = meal => {
    this.closeModalPlanning();
    const { recipes, nbPerson: nbP, meals_db, recipe_toAdd } = this.state;
    recipe_toAdd.isIntoPlanning = true;
    let newMeal_db = meals_db.find(meal_db => meal_db.id === meal.id);
    newMeal_db.recipes.push({ id: recipe_toAdd.id });
    const newMeals = this._computeMeals_from_meals_db(meals_db, recipes, nbP);
    Services.updateRecipe(recipe_toAdd.id, recipe_toAdd).then(() => {
      Services.updateMeal(newMeal_db.id, newMeal_db).then(() => {
        this.setState({ recipes, meals_db, meals: newMeals });
      });
    });
  };

  ///////////////////////////////////////////
  ///////////////////////////////////////////
  ///////////////////////////////////////////
  /// VIEW
  ///////////////////////////////////////////
  ///////////////////////////////////////////
  ///////////////////////////////////////////

  render() {
    return (
      <Router>
        <div className="appRouter">
          <ul className={`nav ${this.state.cssPage}`}>
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
            <li>
              <Link to="/errand">Errand</Link>
            </li>
          </ul>

          <div className="route">
            <Route
              exact
              path="/"
              render={props => (
                <ContainerHome
                  {...props}
                  cssPage={this.state.cssPage}
                  setCssPage={this.setCssPage}
                />
              )}
            />
            <Route
              path="/recipe"
              render={props => (
                <ContainerRecipe
                  {...props}
                  cssPage={this.state.cssPage}
                  setCssPage={this.setCssPage}
                  recipes={this.state.recipes}
                  createRecipe={this.createRecipe}
                  toogleFavorite={this.toogleFavorite}
                  openModalPlanning={this.openModalPlanning}
                  removeRecipeFromPlanning={this.removeRecipeFromPlanning}
                  deleteRecipe={this.deleteRecipe}
                  isIntoModal={false}
                />
              )}
            />
            <Route
              path="/planning"
              render={props => (
                <ContainerPlanning
                  {...props}
                  cssPage={this.state.cssPage}
                  setCssPage={this.setCssPage}
                  meals={this.state.meals}
                  nbPerson={this.state.nbPerson}
                  changeNbPerson={this.changeNbPerson}
                  onClickMeal={this.openModalRecipe}
                />
              )}
            />
            <Route
              path="/errand"
              render={props => (
                <ContainerErrand
                  cssPage={this.state.cssPage}
                  setCssPage={this.setCssPage}
                  meals={this.state.meals}
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
              recipes={this.state.recipes_toDisplayModal}
              toogleFavorite={this.toogleFavorite}
              removeRecipeFromPlanning={
                this.removeRecipeFromPlanning_fromModalRecipe
              }
              isIntoModal={true}
              changeNbPerson={this.changeNbPersonMealRecipe}
            />
          </Modal>
        </div>
      </Router>
    );
  }
}

export default AppRouter;

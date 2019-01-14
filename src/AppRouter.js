import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "./AppRouter.scss";
import ContainerHome from "./home/ContainerHome.js";
import ContainerRecipe from "./recipe/ContainerRecipe.js";
import ContainerPlanning from "./planning/ContainerPlanning.js";
import Planning from "./planning/Planning";
import ListRecipe from "./recipe/ListRecipe";
import ContainerErrand from "./errand/ContainerErrand";
import Services from "./services/Services";
import Utils from "./Utils";

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
    mealsDB: [],
    meals: [],
    isModalPlanningOpen: false,
    isModalRecipeOpen: false,
    recipesMeal: [],
    recipeForPlanning: undefined,
    idMealOpenModal: undefined
  };

  componentDidMount() {
    Services.getNbPerson().then(dataNbPerson => {
      Services.getRecipes().then(dataRecipes => {
        Services.getMeals().then(dataMeals => {
          const newMeals = Utils.computeMealsFromMealsDB(
            dataMeals,
            dataRecipes,
            dataNbPerson.value
          );
          this.setState({
            nbPerson: dataNbPerson.value,
            recipes: dataRecipes,
            mealsDB: dataMeals,
            meals: newMeals
          });
        });
      });
    });
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
    const recipe = Utils.fakeRecipe();
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
    const { recipes, nbPerson: nbP, mealsDB } = this.state;
    if (recipe.isIntoPlanning) {
      const newMealDB = Utils.removeFromPlanning(recipe, mealsDB);
      const newMeals = Utils.computeMealsFromMealsDB(mealsDB, recipes, nbP);
      const newRecipes = recipes.filter(r => r.id !== recipe.id);
      Services.deleteRecipe(recipe.id).then(() => {
        Services.updateMeal(newMealDB.id, newMealDB).then(() => {
          this.setState({ recipes: newRecipes, mealsDB, meals: newMeals });
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
    this.setState({ isModalPlanningOpen: true, recipeForPlanning: recipe });
  };

  removeRecipeFromPlanning = recipe => {
    const { recipes, nbPerson: nbP, mealsDB } = this.state;
    const newMealDB = Utils.removeFromPlanning(recipe, mealsDB);
    const newMeals = Utils.computeMealsFromMealsDB(mealsDB, recipes, nbP);
    recipe.isIntoPlanning = false;
    Services.updateRecipe(recipe.id, recipe).then(() => {
      Services.updateMeal(newMealDB.id, newMealDB).then(() => {
        this.setState({ recipes, mealsDB, meals: newMeals });
      });
    });
  };

  /// FROM MODAL RECIPE (open from Planning)
  ///////////////////////////////////////////

  closeModalRecipe = meal => {
    this.setState({ isModalRecipeOpen: false });
  };

  changeNbPersonMealRecipe = (newNb, recipe) => {
    const { recipes, mealsDB, nbPerson: nbP, idMealOpenModal } = this.state;
    let newMealDB = mealsDB.find(mealDB => mealDB.id === idMealOpenModal);
    let recipeDB = newMealDB.recipes.find(rDB => rDB.id === recipe.id);
    recipeDB.nbPerson = newNb;
    const newMeals = Utils.computeMealsFromMealsDB(mealsDB, recipes, nbP);
    const mealOpenModal = newMeals.find(meal => meal.id === idMealOpenModal);
    Services.updateMeal(newMealDB.id, newMealDB).then(() => {
      this.setState({
        mealsDB,
        meals: newMeals,
        recipesMeal: mealOpenModal.recipes
      });
    });
  };

  removeRecipeFromPlanningFromModal = recipeMeal => {
    this.closeModalRecipe();
    // recipeMeal is a copy of recipe
    let recipe = this.state.recipes.find(r => recipeMeal.id === r.id);
    this.removeRecipeFromPlanning(recipe);
  };

  /// FROM PLANNING
  ///////////////////////////////////////////

  changeNbPerson = newNb => {
    if (newNb <= 0) return;
    const { recipes, mealsDB } = this.state;
    const newMeals = Utils.computeMealsFromMealsDB(mealsDB, recipes, newNb);
    Services.updateNbPerson(newNb).then(() => {
      this.setState({ nbPerson: newNb, meals: newMeals });
    });
  };

  openModalRecipe = meal => {
    if (meal.recipes.length > 0) {
      this.setState({
        isModalRecipeOpen: true,
        recipesMeal: meal.recipes,
        idMealOpenModal: meal.id
      });
    }
  };

  /// FROM MODAL PLANNING (open from Recipe)
  ///////////////////////////////////////////

  closeModalPlanning = () => {
    this.setState({ isModalPlanningOpen: false });
  };

  mealPlanningChosen = meal => {
    this.closeModalPlanning();
    const { recipes, nbPerson: nbP, mealsDB, recipeForPlanning } = this.state;
    recipeForPlanning.isIntoPlanning = true;
    let newMealDB = mealsDB.find(mealDB => mealDB.id === meal.id);
    newMealDB.recipes.push({ id: recipeForPlanning.id });
    const newMeals = Utils.computeMealsFromMealsDB(mealsDB, recipes, nbP);
    Services.updateRecipe(recipeForPlanning.id, recipeForPlanning).then(() => {
      Services.updateMeal(newMealDB.id, newMealDB).then(() => {
        this.setState({ recipes, mealsDB, meals: newMeals });
      });
    });
  };

  ///////////////////////////////////////////
  /// VIEW
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
              recipes={this.state.recipesMeal}
              toogleFavorite={this.toogleFavorite}
              removeRecipeFromPlanning={this.removeRecipeFromPlanningFromModal}
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

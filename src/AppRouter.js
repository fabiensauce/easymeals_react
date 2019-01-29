import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./Global.scss";
import "./AppRouter.scss";
import ContainerHome from "./home/ContainerHome.js";
import ContainerRecipe from "./recipe/ContainerRecipe.js";
import ContainerPlanning from "./planning/ContainerPlanning.js";
import ContainerErrand from "./errand/ContainerErrand";
import Services from "./services/Services";
import Utils from "./Utils";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
library.add(fas, far);

class AppRouter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cssPage: "home",
      nbPerson: undefined,
      recipes: [],
      mealsDB: [],
      meals: []
    };
  }

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

  updateStateRecipes = recipes => {
    this.setState({ recipes });
  };

  removeRecipeOfPlanning = recipe => {
    recipe.isIntoPlanning = false;
    Services.updateRecipe(recipe.id, recipe).then(() => {
      this.setState({ recipes: this.state.recipes });
      this.removeRecipeOfMealsDB(recipe);
    });
  };
  removeRecipeOfMealsDB = recipe => {
    const { recipes, nbPerson: nbP, mealsDB } = this.state;
    const newMealDB = Utils.removeFromPlanning(recipe, mealsDB);
    const newMeals = Utils.computeMealsFromMealsDB(mealsDB, recipes, nbP);
    Services.updateMeal(newMealDB.id, newMealDB).then(() => {
      this.setState({ mealsDB, meals: newMeals });
    });
  };

  mealPlanningChosenFromModal = (meal, recipeForPlanning) => {
    const { recipes, nbPerson: nbP, mealsDB } = this.state;
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

  /// FROM PLANNING
  ///////////////////////////////////////////

  removeRecipeFromModal = recipeMeal => {
    // recipeMeal is a copy of recipe
    let recipe = this.state.recipes.find(r => r.id === recipeMeal.id);
    this.removeRecipeOfPlanning(recipe);
  };

  changeNbPerson = newNb => {
    if (newNb <= 0) return;
    const { recipes, mealsDB } = this.state;
    const newMeals = Utils.computeMealsFromMealsDB(mealsDB, recipes, newNb);
    Services.updateNbPerson(newNb).then(() => {
      this.setState({ nbPerson: newNb, meals: newMeals });
    });
  };

  changeNbPersonMealFromModal = (newNb, recipe, idMealOpenModal) => {
    const { recipes, mealsDB, nbPerson: nbP } = this.state;
    let newMealDB = mealsDB.find(mealDB => mealDB.id === idMealOpenModal);
    let recipeDB = newMealDB.recipes.find(rDB => rDB.id === recipe.id);
    recipeDB.nbPerson = newNb;
    const newMeals = Utils.computeMealsFromMealsDB(mealsDB, recipes, nbP);
    Services.updateMeal(newMealDB.id, newMealDB).then(() => {
      this.setState({ mealsDB, meals: newMeals });
    });
    return newMeals;
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
              <Link to="/">Home</Link>{" "}
            </li>
            <li>
              <Link to="/recipe">Recipe</Link>{" "}
            </li>
            <li>
              <Link to="/planning">Planning</Link>{" "}
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
                  meals={this.state.meals}
                  updateStateRecipes={this.updateStateRecipes}
                  removeRecipeOfPlanning={this.removeRecipeOfPlanning}
                  removeRecipeOfMealsDB={this.removeRecipeOfMealsDB}
                  mealPlanningChosenFromModal={this.mealPlanningChosenFromModal}
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
                  removeRecipeFromModal={this.removeRecipeFromModal}
                  changeNbPersonMealFromModal={this.changeNbPersonMealFromModal}
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
        </div>
      </Router>
    );
  }
}

export default AppRouter;

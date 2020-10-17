import React, { Component } from "react";
import "./ContainerRecipe.scss";
import ListRecipe from "./ListRecipe";
import Creation from "./creation/Creation";
import ModalPlanning from "./ModalPlanning";
import Services from "../services/Services";

class ContainerRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalPlanningOpen: false,
      recipeForPlanning: undefined,
      searchText: ""
    };
  }

  componentDidMount() {
    let { cssPage, setCssPage } = this.props;
    if (cssPage !== "recipe") setCssPage("recipe");
  }

  createRecipe = recipe => {
    Services.createRecipe(recipe).then(newRecipe => {
      this.props.updateStateRecipes([...this.props.recipes, newRecipe]);
    });
  };

  toogleFavorite = recipe => {
    recipe.isFavorite = !recipe.isFavorite;
    Services.updateRecipe(recipe.id, recipe).then(() => {
      this.props.updateStateRecipes(this.props.recipes);
    });
  };

  deleteRecipe = recipe => {
    const newRecipes = this.props.recipes.filter(r => r.id !== recipe.id);
    Services.deleteRecipe(recipe.id).then(() => {
      this.props.updateStateRecipes(newRecipes);
      if (recipe.isIntoPlanning) this.props.removeRecipeOfMealsDB(recipe);
    });
  };

  openModalPlanning = recipe => {
    this.setState({ isModalPlanningOpen: true, recipeForPlanning: recipe });
  };

  /// EVENT FROM MODAL
  ///////////////////////////////////////////

  closeModalPlanning = () => {
    this.setState({ isModalPlanningOpen: false });
  };

  mealPlanningChosenFromModal = meal => {
    this.closeModalPlanning();
    this.props.mealPlanningChosenFromModal(meal, this.state.recipeForPlanning);
  };

  handleSearchTextChange = e => {
    this.setState({ searchText: e.target.value });
  };

  render() {
    const recipes = this.props.recipes.filter(recipe => {
      if (recipe.name.indexOf(this.state.searchText) !== -1) return recipe;
      else {
        for (let ing of recipe.ingredients) {
          if (ing.food.indexOf(this.state.searchText) !== -1) return recipe;
        }
      }
      return undefined;
    });

    return (
      <div className="containerRecipe">
        <input
          type="text"
          placeholder="Search Recipe, Ingredient..."
          value={this.state.searchText}
          onChange={this.handleSearchTextChange}
        />
        <div>nb recipes : {recipes.length}</div>

        <ListRecipe
          recipes={recipes}
          toogleFavorite={this.toogleFavorite}
          openModalPlanning={this.openModalPlanning}
          removeRecipeOfPlanning={this.props.removeRecipeOfPlanning}
          deleteRecipe={this.deleteRecipe}
          isIntoModal={false}
        />
        <Creation createRecipe={this.createRecipe} />

        <ModalPlanning
          meals={this.props.meals}
          isOpen={this.state.isModalPlanningOpen}
          close={this.closeModalPlanning}
          mealPlanningChosen={this.mealPlanningChosenFromModal}
        />
      </div>
    );
  }
}

export default ContainerRecipe;

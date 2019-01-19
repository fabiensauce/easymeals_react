import React, { Component } from "react";
import "./ContainerPlanning.scss";
import Planning from "./Planning";
import ChooseNbPerson from "./ChooseNbPerson";
import ModalRecipe from "./ModalRecipe";

class ContainerPlanning extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipesOfMeal: [],
      isModalRecipeOpen: false,
      idMealOpenModal: undefined
    };
  }

  componentDidMount() {
    let { cssPage, setCssPage } = this.props;
    if (cssPage !== "planning") setCssPage("planning");
  }

  openModalRecipe = meal => {
    if (meal.recipes.length > 0) {
      this.setState({
        isModalRecipeOpen: true,
        recipesOfMeal: meal.recipes,
        idMealOpenModal: meal.id
      });
    }
  };

  /// EVENT FROM MODAL
  ///////////////////////////////////////////

  closeModalRecipe = () => {
    this.setState({ isModalRecipeOpen: false });
  };

  changeNbPersonMealFromModal = (newNb, recipe) => {
    const { idMealOpenModal: idMeal } = this.state;
    const args = [newNb, recipe, idMeal];
    const newMeals = this.props.changeNbPersonMealFromModal(...args);
    const mealOpenModal = newMeals.find(meal => meal.id === idMeal);
    this.setState({ recipesOfMeal: mealOpenModal.recipes });
  };

  removeRecipeFromModal = recipeMeal => {
    this.closeModalRecipe();
    this.props.removeRecipeFromModal(recipeMeal);
  };

  render() {
    const { isModalRecipeOpen, recipesOfMeal } = this.state;
    const { meals, nbPerson, changeNbPerson } = this.props;
    return (
      <div className="containerPlanning">
        <ChooseNbPerson nbPerson={nbPerson} changeNbPerson={changeNbPerson} />
        <Planning
          meals={meals}
          nbPersonGlobal={nbPerson}
          onClickMeal={this.openModalRecipe}
        />
        <ModalRecipe
          recipesOfMeal={recipesOfMeal}
          isOpen={isModalRecipeOpen}
          close={this.closeModalRecipe}
          changeNbPersonMeal={this.changeNbPersonMealFromModal}
          removeRecipe={this.removeRecipeFromModal}
        />
      </div>
    );
  }
}

export default ContainerPlanning;

import React, { Component } from "react";

import "./ContainerRecipe.scss";
import ListRecipe from "./ListRecipe";
import Creation from "./creation/Creation";
import ModalPlanning from "./ModalPlanning";

class ContainerRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalPlanningOpen: false,
      recipeForPlanning: undefined
    };
  }

  componentDidMount() {
    let { cssPage, setCssPage } = this.props;
    if (cssPage !== "recipe") setCssPage("recipe");
  }

  openModalPlanning = recipe => {
    this.setState({ isModalPlanningOpen: true, recipeForPlanning: recipe });
  };

  /// EVENT FROM MODAL
  ///////////////////////////////////////////

  closeModalPlanning = () => {
    this.setState({ isModalPlanningOpen: false });
  };
  mealPlanningChosen = meal => {
    this.closeModalPlanning();
    this.props.mealPlanningChosen(meal, this.state.recipeForPlanning);
  };
  render() {
    const {
      recipes,
      createRecipe,
      toogleFavorite,
      removeRecipeOfPlanning,
      deleteRecipe,
      meals
    } = this.props;
    const { isModalPlanningOpen } = this.state;
    return (
      <div className="containerRecipe">
        <ListRecipe
          recipes={recipes}
          toogleFavorite={toogleFavorite}
          openModalPlanning={this.openModalPlanning}
          removeRecipeOfPlanning={removeRecipeOfPlanning}
          deleteRecipe={deleteRecipe}
          isIntoModal={false}
        />
        <Creation createRecipe={createRecipe} />

        <ModalPlanning
          meals={meals}
          isOpen={isModalPlanningOpen}
          close={this.closeModalPlanning}
          mealPlanningChosen={this.mealPlanningChosen}
        />
      </div>
    );
  }
}

export default ContainerRecipe;

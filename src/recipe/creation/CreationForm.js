import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from "lodash";
import { IngredientForm, StepForm } from "./CreationSubForm";

class CreationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputName: "",
      inputNbPers: 4,
      inputIngQty: "",
      inputIngFood: "",
      ingredients: [],
      inputQty: 1,
      inputUnit: "",
      inputFood: "",
      steps: [],
      inputStep: ""
    };
  }

  ///////////////////////////////////////////
  /// EVENTS - all Arrow fx for binding !
  ///////////////////////////////////////////

  // prevent to submit by pressing Enter
  handleSubmitKeyPress = event => {
    if (event.key === "Enter") event.preventDefault();
  };
  handleSubmit = event => {
    const { createRecipe, toggleCreation } = this.props;
    event.preventDefault();
    const { inputName, inputNbPers, ingredients, steps } = this.state;
    let recipe = {
      name: inputName,
      nbPerson: inputNbPers,
      ingredients: ingredients,
      steps: steps,
      isFavorite: false
    };
    createRecipe(recipe);
    toggleCreation();
  };

  handleChangeInput = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  addIngredient = () => {
    console.log("into addingredient !!");
    const qty = this.state.inputQty;
    const unit = this.state.inputUnit;
    const food = this.state.inputFood;
    let ingredient = { qty, unit, food };
    this.setState({
      ingredients: [...this.state.ingredients, ingredient],
      inputQty: 1,
      inputUnit: "",
      inputFood: ""
    });
  };
  addStep = () => {
    const inputStep = this.state.inputStep;
    this.setState({
      steps: [...this.state.steps, inputStep],
      inputStep: ""
    });
  };
  removeIng = ing => {
    _.remove(this.state.ingredients, stateIng => {
      return stateIng.qty === ing.qty && stateIng.food === ing.food;
    });
    this.setState({
      ingredients: this.state.ingredients
    });
  };
  removeStep = step => {
    _.remove(this.state.steps, stateStep => stateStep === step);
    this.setState({
      steps: this.state.steps
    });
  };

  render() {
    const NameForm = (
      <div className="name">
        <input
          name="inputName"
          className="inputName"
          type="text"
          value={this.state.inputName}
          onChange={this.handleChangeInput}
          placeholder="Name"
        />
      </div>
    );
    const NbPersForm = (
      <div className="nbPers">
        <FontAwesomeIcon icon="users" />
        <input
          name="inputNbPers"
          className="inputNbPers"
          type="number"
          min="1"
          value={this.state.inputNbPers}
          onChange={this.handleChangeInput}
        />
      </div>
    );
    return (
      <div className="formCreate">
        <form
          onSubmit={this.handleSubmit}
          onKeyPress={this.handleSubmitKeyPress}
        >
          <div className="header">
            {NameForm}
            {NbPersForm}
            <input className="btnSubmit" type="submit" value="Create" />
          </div>
          <div className="content">
            <IngredientForm
              inputQty={this.state.inputQty}
              inputUnit={this.state.inputUnit}
              inputFood={this.state.inputFood}
              ingredients={this.state.ingredients}
              handleChangeInput={this.handleChangeInput}
              addIngredient={this.addIngredient}
              removeIng={this.removeIng}
            />
            <StepForm
              inputStep={this.state.inputStep}
              steps={this.state.steps}
              handleChangeInput={this.handleChangeInput}
              addStep={this.addStep}
              removeStep={this.removeStep}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default CreationForm;

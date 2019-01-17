import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function IngredientForm({
  inputQty,
  inputUnit,
  inputFood,
  ingredients,
  handleChangeInput,
  addIngredient,
  removeIng
}) {
  const handleKeyPress = event => {
    if (event.key === "Enter") {
      event.preventDefault();
      addIngredient();
    }
  };
  return (
    <div className="ingredientsWrapper">
      <div className="ingredients">
        <div className="headerIngredient">
          <input
            name="inputQty"
            className="inputQty"
            type="number"
            min="1"
            value={inputQty}
            onChange={handleChangeInput}
            onKeyPress={handleKeyPress}
          />
          <input
            name="inputUnit"
            className="inputUnit"
            type="text"
            placeholder="g"
            value={inputUnit}
            onChange={handleChangeInput}
            onKeyPress={handleKeyPress}
          />
          <input
            name="inputFood"
            className="inputFood"
            type="text"
            placeholder="Steack"
            value={inputFood}
            onChange={handleChangeInput}
            onKeyPress={handleKeyPress}
          />

          <div className="addBtn" onClick={addIngredient}>
            <FontAwesomeIcon icon="plus-square" />
          </div>
        </div>
        <div className="listIngredient">
          {ingredients.map((ing, index) => (
            <div className="ingredient" key={index}>
              {ing.qty} {ing.unit} {ing.food}
              <span className="removeElem" onClick={() => removeIng(ing)}>
                <FontAwesomeIcon icon="times-circle" />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function StepForm({
  inputStep,
  steps,
  handleChangeInput,
  addStep,
  removeStep
}) {
  const handleKeyPress = event => {
    if (event.key === "Enter") addStep();
  };

  return (
    <div className="stepsWrapper">
      <div className="steps">
        <div className="headerStep">
          <input
            name="inputStep"
            className="inputStep"
            type="text"
            placeholder="Mix in a boil eggs and flour"
            value={inputStep}
            onChange={handleChangeInput}
            onKeyPress={handleKeyPress}
          />

          <div className="addBtn" onClick={addStep}>
            <FontAwesomeIcon icon="plus-square" />
          </div>
        </div>
        <div className="listStep">
          {steps.map((step, index) => (
            <div className="step" key={index}>
              Step {index + 1} - {step}
              <span className="removeElem" onClick={() => removeStep(step)}>
                <FontAwesomeIcon icon="times-circle" />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

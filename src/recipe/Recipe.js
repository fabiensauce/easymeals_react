import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Recipe({
  recipe,
  toogleFavorite,
  addRecipeIntoPlanning,
  removeRecipeFromPlanning,
  deleteRecipe
}) {
  let intoPlanning = recipe.isIntoPlanning ? "isIntoPlanning" : "";
  return (
    <div className={`recipe ${intoPlanning}`}>
      <div className="header">
        <div className="name">
          {recipe.name} ({recipe.id}){" "}
        </div>
        <div className="deleteRecipe" onClick={() => deleteRecipe(recipe)}>
          <FontAwesomeIcon icon={["fas", "trash-alt"]} />
        </div>

        <div className="right">
          <div className="pers">
            <FontAwesomeIcon icon="users" />
            {" " + recipe.nbPerson}
          </div>
          <div className="favorite" onClick={() => toogleFavorite(recipe)}>
            <FontAwesomeIcon
              className={recipe.isFavorite ? "isFavorite" : "notFavorite"}
              icon={["fas", "heart"]}
            />
          </div>

          {recipe.isIntoPlanning ? (
            <div
              className="removeFromPlanning"
              onClick={() => removeRecipeFromPlanning(recipe)}
            >
              <FontAwesomeIcon icon="minus-square" />
            </div>
          ) : (
            <div
              className="addIntoPlanning"
              onClick={() => addRecipeIntoPlanning(recipe, 23)}
            >
              <FontAwesomeIcon icon="plus-square" />
            </div>
          )}
        </div>
      </div>
      <div className="body">
        <div className="ingredientList">
          {recipe.ingredients.map((ingredient, index) => (
            <div className="ingredient" key={index}>
              {ingredient.qty + " " + ingredient.unit + " " + ingredient.food}
            </div>
          ))}
        </div>

        <div className="stepList">
          {recipe.steps.map((step, index) => (
            <div className="step" key={index}>
              <span className="stepTitle"> Step {index + 1} </span>
              <span className="stepContent">{step}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Recipe;

// id: 0,
// name: "crepes",
// isFavorite: false,
// nbPerson: 2,
// ingredients: [
//   { qty: 3, unit: "g", food: "egg" },
//   { qty: 100, unit: "g", food: "flou" },
//   { qty: 1, unit: "l", food: "milk" }
// ],
// description: "easy to do... start with the eggs and flour then add milk",
// step:

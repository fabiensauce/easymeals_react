import React from "react";

function Recipe({ recipe }) {
  console.log(" recipe ", recipe);

  return (
    <div className="recipe">
      <div className="header">
        <div className="name">{recipe.name}</div>
        <div className="right">
          <div className="pers">{recipe.nbPerson} Pers.</div>
          <div className="favorite">{recipe.isFavorite && "x3"}</div>
          <div className="addPlanning"> + </div>
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

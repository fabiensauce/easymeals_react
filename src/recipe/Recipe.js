import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ChooseNbPerson from "../planning/ChooseNbPerson";
function Recipe({
  recipe,
  toogleFavorite,
  openModalPlanning,
  removeRecipeFromPlanning,
  deleteRecipe,
  isIntoModal,
  changeNbPerson
}) {
  let intoPlanning = recipe.isIntoPlanning ? "isIntoPlanning" : "";
  return (
    <div className={`recipe ${intoPlanning}`}>
      <div className="header">
        <div className="name">{recipe.name}</div>
        {!isIntoModal && (
          <div className="deleteRecipe" onClick={() => deleteRecipe(recipe)}>
            <FontAwesomeIcon icon={["fas", "trash-alt"]} />
          </div>
        )}
        <div className="right">
          <div className="pers">
            {isIntoModal ? (
              <ChooseNbPerson
                nbPerson={recipe.nbPerson}
                changeNbPerson={changeNbPerson}
                recipe={recipe}
              />
            ) : (
              <div>
                <FontAwesomeIcon icon="users" /> {" " + recipe.nbPerson}
              </div>
            )}
          </div>

          {!isIntoModal && (
            <div className="favorite" onClick={() => toogleFavorite(recipe)}>
              <FontAwesomeIcon
                className={recipe.isFavorite ? "isFavorite" : "notFavorite"}
                icon={["fas", "heart"]}
              />
            </div>
          )}

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
              onClick={() => openModalPlanning(recipe)}
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

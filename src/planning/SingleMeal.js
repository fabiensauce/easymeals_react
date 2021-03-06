import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SingleMeal({ meal, nbPersonGlobal, onClickMeal }) {
  const displayNbPers = recipe => {
    return (
      nbPersonGlobal &&
      nbPersonGlobal !== recipe.nbPerson && (
        <div className="nbPersonDiff">
          <FontAwesomeIcon icon="users" /> {" " + recipe.nbPerson}
        </div>
      )
    );
  };
  return (
    <td onClick={() => onClickMeal(meal)}>
      <div className="meal">
        {meal.recipes.map((recipe, index) => (
          <div className="recipeName" key={index}>
            {recipe.name}
            {displayNbPers(recipe)}
          </div>
        ))}
      </div>
    </td>
  );
}

export default SingleMeal;

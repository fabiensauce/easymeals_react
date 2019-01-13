import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Meal({ meal, nbPersonGlobal, onClickMeal }) {
  const displayNbPers = recipe => {
    return (
      nbPersonGlobal !== recipe.nbPerson && (
        <div className="nbPersonDiff">
          <FontAwesomeIcon icon="users" /> {" " + recipe.nbPerson}
        </div>
      )
    );
  };

  return (
    <td>
      <div className="meal" onClick={() => onClickMeal(meal)}>
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

export default Meal;

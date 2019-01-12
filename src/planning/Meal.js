import React from "react";

function Meal({ meal, onClickMeal }) {
  return (
    <td>
      <div className="meal" onClick={() => onClickMeal(meal)}>
        {meal.recipes.map((recipe, index) => (
          <div className="recipeName" key={index}>
            {recipe.name}
          </div>
        ))}
      </div>
    </td>
  );
}

export default Meal;

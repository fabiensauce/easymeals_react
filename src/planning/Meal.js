import React from "react";

function Meal({ meal }) {
  return (
    <td className="mealsBox">
      <div className="divMeals">
        {meal.recipes.map((recipe, index) => (
          <div className="meal" key={index}>
            {recipe.name} _ {recipe.id}
          </div>
        ))}
      </div>
    </td>
  );
}

export default Meal;

import React from "react";

function MealsBox({ recipes }) {
  return (
    <td className="mealsBox">
      <div className="divMeals">
        {recipes.map((recipe, index) => (
          <div className="meal" key={index}>
            {recipe.name}
          </div>
        ))}
      </div>
    </td>
  );
}

export default MealsBox;

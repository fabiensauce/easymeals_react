import React from "react";

function MealsBox({ recipes }) {
  return (
    <td className="mealsBox">
      {recipes.map((recipe, index) => (
        <div className="meal" key={index}>
          {recipe.name}
        </div>
      ))}
    </td>
  );
}

export default MealsBox;

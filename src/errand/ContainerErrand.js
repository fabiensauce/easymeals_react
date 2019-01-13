import React from "react";

import "./containerErrand.scss";

// HERE LOAD custom errand from // DEBUG:

function ContainerErrand({ cssPage, setCssPage, meals }) {
  if (cssPage !== "errand") setCssPage("errand");

  function _computeErrandsFromMeals(meals) {
    // console.log("_computeErrandsFromMeals() --- ", meals);

    let errands = [];
    for (let meal of meals) {
      for (let recipe of meal.recipes) {
        for (let ingredient of recipe.ingredients) {
          errands.push(ingredient);
        }
      }
    }
    // console.log("errands : ", errands);s
    return errands;
  }

  let errands = _computeErrandsFromMeals(meals);

  return (
    <div className="container_errand">
      {errands.map((ingredient, index) => (
        <div className="ingredient" key={index}>
          {ingredient.qty + " " + ingredient.unit + " " + ingredient.food}
        </div>
      ))}
    </div>
  );
}

export default ContainerErrand;

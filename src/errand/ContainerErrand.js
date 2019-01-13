import React from "react";

import "./containerErrand.scss";

// HERE LOAD custom errand from // DEBUG:

function ContainerErrand({ cssPage, setCssPage, meals }) {
  if (cssPage !== "errand") setCssPage("errand");

  function _flattenRecipes(recipes) {
    return recipes.reduce((result_ingredients, currRecipe) => {
      return [...result_ingredients, ...currRecipe.ingredients];
    }, []);
  }
  function _flattenMeals(meals) {
    return meals.reduce((result_ingredients, currMeal) => {
      let ingredients = _flattenRecipes(currMeal.recipes);
      return [...result_ingredients, ...ingredients];
    }, []);
  }
  function _mergeIngredients(ingredients) {
    console.log(ingredients);
    let mergedIngredients = [];
    for (let errand of ingredients) {
      let mergedErrand = mergedIngredients.find(mi => mi.food === errand.food);
      if (mergedErrand) {
        mergedErrand.qty = mergedErrand.qty + errand.qty;
      } else mergedIngredients.push({ ...errand });
    }
    return mergedIngredients;
  }
  const _computeErrandsFromMeals = meals =>
    _mergeIngredients(_flattenMeals(meals));

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

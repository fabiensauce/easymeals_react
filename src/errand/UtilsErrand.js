import _ from "lodash";

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
  let mergedIngredients = [];
  for (let errand of ingredients) {
    let mergedErrand = mergedIngredients.find(mi => mi.food === errand.food);
    if (mergedErrand) {
      mergedErrand.qty = mergedErrand.qty + errand.qty;
    } else mergedIngredients.push({ ...errand });
  }
  return mergedIngredients;
}

export function _computeErrands(meals) {
  return _mergeIngredients(_flattenMeals(meals));
}

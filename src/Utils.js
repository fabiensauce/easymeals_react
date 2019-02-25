import _ from "lodash";

const Utils = {
  computeMealsFromMealsDB: (mealsDB, stateRecipes, stateNbPerson) => {
    const _computeRecipe_from_recipeDB = recipeDB => {
      let { nbPerson, ingredients, ...others } = stateRecipes.find(
        recipe => recipe.id === recipeDB.id
      );
      let newNbPerson = recipeDB.nbPerson || stateNbPerson;
      let newIngredients = ingredients.map(ingredient => {
        let { qty, ...others } = ingredient;
        let newQty = (qty * newNbPerson) / nbPerson;
        return { qty: Math.round(newQty), ...others };
        // return { qty: Number(newQty.toFixed(1)), ...others };
      });
      return {
        nbPerson: newNbPerson,
        ingredients: newIngredients,
        ...others
      };
    };
    return mealsDB.map(mealDB => ({
      id: mealDB.id,
      recipes: mealDB.recipes.map(_computeRecipe_from_recipeDB)
    }));
  },

  removeFromPlanning: (recipeRemove, mealsDB) => {
    let newMealDB = mealsDB.find(mealDB =>
      mealDB.recipes.find(recipeDB => recipeDB.id === recipeRemove.id)
    );
    _.remove(newMealDB.recipes, recipeDB => recipeDB.id === recipeRemove.id);
    return newMealDB;
  },

  fakeRecipe: () => {
    return {
      name: "salade CESAR ",
      isFavorite: false,
      nbPerson: 14,
      ingredients: [
        { qty: 3, unit: "g", food: "butter" },
        { qty: 100, unit: "g", food: "flou" },
        { qty: 1, unit: "l", food: "milk" }
      ],
      description: "blablablak",
      steps: ["mix flour and eggs", "add slowly milk"]
    };
  }

};
export default Utils;

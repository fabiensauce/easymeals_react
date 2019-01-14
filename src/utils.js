import _ from "lodash";

const Utils = {
  computeMeals_from_meals_db: (meals_db, stateRecipes, stateNbPerson) => {
    const _computeRecipe_from_recipe_db = recipe_db => {
      let { nbPerson, ingredients, ...others } = stateRecipes.find(
        recipe => recipe.id === recipe_db.id
      );
      let newNbPerson = recipe_db.nbPerson || stateNbPerson;
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
    return meals_db.map(meal_db => ({
      id: meal_db.id,
      recipes: meal_db.recipes.map(_computeRecipe_from_recipe_db)
    }));
  },

  removeFromPlanning: (recipeRemove, meals_db) => {
    let newMeal_db = meals_db.find(meal_db =>
      meal_db.recipes.find(recipe_db => recipe_db.id === recipeRemove.id)
    );
    _.remove(newMeal_db.recipes, recipe_db => recipe_db.id === recipeRemove.id);
    return newMeal_db;
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

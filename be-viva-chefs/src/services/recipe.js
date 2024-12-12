import RecipeSchema from "../models/RecipeSchema.js";
import IngredientSchema from "../models/IngredientSchema.js";
import RecipeIngredientSchema from "../models/RecipeIngredientSchema.js";
import { addManyReceipeIngredients, findRecipe, findAllRecipe, createRecipe, findIngredient, createIngredient, findRecipeIngredient, createRecipeIngredient, updateRecipeIngredient } from "../repository/recipeRepository.js";

export const getAllRecipe = async (recipeName) =>{
  try{
    return await findAllRecipe(recipeName);
  } catch(error){
    console.log('Error in rerieving the recipes :', error);
    throw error;
  }
};

export const getRecipe = async (name)=>{
  try{
    return await findRecipe(name);
  } catch(error){
      throw error;
  }
};

export const addRecipe = async (name, servings) => {
  try {
    let recipe = await RecipeSchema.findOne({ recipe_name: name });
    if (!recipe) {
       recipe = new RecipeSchema({ recipe_name: name, servings: servings });
       recipe = await createRecipe(recipe);
    }
    return recipe;
  } catch (error) {
      console.log(`Error in creating recipe:`, error);
      throw error;
  }
};

export const addIngredients = async (ingredients, recipe) =>{
  try{
    //let ingredient;
    const recipeIngredients = [];
    // for(const {ingredient_name, quantity, unit} of ingredients){
    for (const ingredientData of ingredients) {
      // console.log("ingredientData:", ingredientData);

      //Add  ingredients for a given recipe
      let ingredient = await findIngredient(ingredientData.ingredient_name);
      if(!ingredient){
        ingredient = new IngredientSchema({ingredient_name: ingredientData.ingredient_name});
        ingredient = await createIngredient(ingredient);
        //console.log('INgrediant created:', ingredient);
      }


      let recipeIngredient = await findRecipeIngredient(ingredient._id, recipe._id);
      // console.log('Found recipeIngredient;', recipeIngredient);
      if(!recipeIngredient){
        recipeIngredient = new RecipeIngredientSchema({
          recipeId: recipe._id,
          ingredientId: ingredient._id,
          quantity: ingredientData.quantity,
          unit: ingredientData.unit
        });
        recipeIngredient = await createRecipeIngredient(recipeIngredient);
      } else {
          //if it is already existing then only update the wuantity and unit for the given recipe and ingredent
          recipeIngredient.quantity = quantity;
          recipeIngredient.unit = unit;
          recipeIngredient = await updateRecipeIngredient(recipeIngredient);
      }
    }
    return ingredients;
  } catch(error){
      console.log('Error in creating the ingredients and Recipe Ingredients:', error);
      throw error;
  }
};

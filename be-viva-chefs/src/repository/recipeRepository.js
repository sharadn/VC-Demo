import RecipeSchema from "../models/RecipeSchema.js";
import IngredientSchema from "../models/IngredientSchema.js";
import RecipeIngredientSchema from "../models/RecipeIngredientSchema.js";

export const findRecipe = async (name) => {
  try {
    return await RecipeSchema.findOne({ recipe_name: name });
  } catch (error) {
    console.log(`Error in getting recipe:`, error);
    throw error;
  }
};

export const findAllRecipe = async (recipeName) => {
  try {
    console.log("Filter:", recipeName);
    // Build query filter
    const filter = {};
    if (recipeName) {
      //filter["recipe.recipe_name"] = { $regex: recipeName, $options: "i" }; // Case-insensitive search
      filter["recipe_name"] = { $regex: recipeName, $options: "i" }; //
    }

    // Fetch all recipes
    //const recipes = await RecipeSchema.find(filter);
    const recipes = await RecipeSchema.find(filter).limit(5);

    // Map recipes to their associated ingredients
    const results = await Promise.all(
      recipes.map(async (recipe) => {
        // Find recipe-ingredient associations
        const recipeIngredients = await RecipeIngredientSchema.find({
          recipeId: recipe._id,
        }).populate("ingredientId");

        // Extract ingredient details
        const ingredients = recipeIngredients.map((ri) => ({
          ingredient: ri.ingredientId,
          quantity: ri.quantity,
          unit: ri.unit,
        }));

        return {
          recipe,
          ingredients,
        };
      })
    );

    const formattedResponse = results.map((item) => ({
      recipe_name: item.recipe.recipe_name,
      receip_id: item.recipe._id,
      servings: item.recipe.servings,
      ingredients: item.ingredients.map((ingredient) => ({
        ingredient_name: ingredient.ingredient.ingredient_name,
        quantity: ingredient.quantity,
        unit: ingredient.unit,
      })),
    }));
    return formattedResponse;
  } catch (error) {
    console.log(`Error in getting all receipes :`, error);
    throw error;
  }
};

export const findIngredient = async (ingredientName) => {
  console.log("findIngredient 123:", ingredientName);
  try {
    return await IngredientSchema.findOne({ ingredient_name: ingredientName });
  } catch (error) {
    console.log(`Error in getting all Ingredients :`, error);
    throw error;
  }
};

export const findRecipeIngredient = async (recipeId, ingredientId) => {
  try {
    return await RecipeIngredientSchema.findOne({
      recipeId: recipeId,
      ingredientId: ingredientId,
    });
  } catch (error) {
    console.log(`Error in getting all receipe  Ingredients :`, error);
    throw error;
  }
};

export const createRecipe = async (recipe) => {
  try {
    return await recipe.save();
  } catch (error) {
    console.log(`Error in creating the Recipe :`, error);
    throw error;
  }
};

export const createIngredient = async (ingredient) => {
  try {
    return await ingredient.save();
  } catch (error) {
    console.log(`Error in creating ingredients:`, error);
    throw error;
  }
};

export const createRecipeIngredient = async (receipeIngredient) => {
  console.log("receipeIngredient:", receipeIngredient);
  try {
    return await receipeIngredient.save();
  } catch (error) {
    console.log(`Error in creating Recipe-Ingredients :`, error);
    throw error;
  }
};

export const updateRecipeIngredient = async (receipeIngredient) => {
  try {
    return await receipeIngredient.save();
  } catch (error) {
    console.log(`Error in updating  Recipe-Ingredients :`, error);
    throw error;
  }
};

export const addManyReceipeIngredients = async (receipeIngredients) => {
  try {
    return await RecipeIngredientSchema.insertMany(receipeIngredients);
  } catch (error) {
    console.log(`Error in updating  Recipe-Ingredients :`, error);
    throw error;
  }
};

import mongoose, { Schema } from "mongoose";
// const RecipeIngredientSchema = new mongoose.Schema({
//   recipeId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Recipe",
//     required: true,
//   },
//   ingredientId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Ingredient",
//     required: true,
//   },
//   quantity: { type: Number, required: true },
//   // unit: { type: String, required: [true, "Unit is required!"] }
//   unit: { type: String}
// });

const recipeIngredientSchema = new Schema({
  recipeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipe'
  },
  ingredientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ingredient'
  },
  quantity: {
      type: Number,
      required: false
  },
  unit: {
      type: String,
      required: false
  }
});

export default mongoose.model("RecipeIngredient", recipeIngredientSchema);

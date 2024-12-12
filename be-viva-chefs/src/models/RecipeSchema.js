import mongoose, { Schema } from "mongoose";

// const RecipeSchema = new Schema({
//   recipe_name: { type: String, required: true, unique: true },
//   servings: { type: Number, required: true },
//   recipeIngredients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'RecipeIngredient' , required: true}] // Reference to RecipeIngredient
// });
// export default mongoose.model("Recipe", RecipeSchema);

const recipeSchema = new Schema({
    recipe_name: {
        type: String,
        required: true
    },
    servings: {
        type: Number,
        required: true
    }
});

const Recipe = mongoose.model('Recipe', recipeSchema);
export default Recipe;


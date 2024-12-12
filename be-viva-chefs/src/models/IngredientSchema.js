import mongoose, { Schema } from "mongoose";

// const IngredientSchema = new Schema({
//   ingredient_name: { type: String, required: [true, "Ingredient name is required"], unique: true , trim: true}, // Ensures no duplicate ingredients
// });

const ingredientSchema = new Schema({
    ingredient_name: {
        type: String,
        required: [true, "Ingredient name is required"],
        unique: true
    }
});

const Ingredient = mongoose.model('Ingredient', ingredientSchema);

export default Ingredient;
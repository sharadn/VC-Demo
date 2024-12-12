import { addRecipe, getAllRecipe, getRecipe, addIngredients } from '../services/recipe.js';
import { OPENAI_API_KEY } from "../configs/index.js";
// const xlsx = require('xlsx');
import xlsx from 'xlsx';
import fs from 'fs';
// import { Configuration, OpenAIApi } from 'openai';
import OpenAI from 'openai';


export const getAllRecipes = async (req, res, next)=>{
    try {
      let receipes =  await getAllRecipe(req.query.recipeName);
      return res.json(receipes);
    } catch(error){
      console.log('Error in getting all the recipe:', error);
      return res.status(500).send(error);
    }
};

export const findOneRecipe = async (req, res, next)=>{
  try {
    let receipe =   await getRecipe();
    return res.json(receipe);
  } catch(error){
    console.log('Error in getting all the recipe:', error);
    return res.status(500).send(error);
  }
};

export const createRecipe = async (req, res, next)=>{
  const { recipe_name, servings = 8, ingredients} = req.body;
  try {
    let receipe  = await addRecipe(recipe_name, servings);

    await addIngredients(ingredients, receipe);
    //get one send back 
    return res.json({...receipe, ingredients: ingredients });
  } catch(error){
    console.log(`Error in creating the Ingredents:`, error);
    return res.status(500).send(error);
  }
};

export const importCSV = async (req, res, next)=>{
  try{
    const filePath = req.file.path;
    // Step 1: Parse the CSV file
    const workbook = xlsx.readFile(filePath);
    // console.log('workbook;', workbook);
    const sheetName = workbook.SheetNames[0];
    // console.log('sheetName;', sheetName);
    const rows = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
    // console.log("rows", rows);
    // return res.json(rows);

    const recipesMap = {};
    rows.forEach(async (row) => {
      const { 
        "Dish name": recipe_name, 
        servings = 8,
        Quantity: quantity, 
        "Unit of Measure": unit, 
        Ingredients: ingredient
      } = row;

      if (!recipesMap[recipe_name]) {
        recipesMap[recipe_name] = {
          servings: parseInt(servings),
          ingredients: [],
        };
      }

      recipesMap[recipe_name].ingredients.push({
        ingredient_name: ingredient,
        quantity: quantity ? parseFloat(quantity) : null,
        unit,
      });
    });

    for( const [recipe_name, receipeData] of Object.entries(recipesMap)){
      let receipe  = await addRecipe(recipe_name, receipeData.servings);
      await addIngredients(receipeData.ingredients, receipe);
    }

    fs.unlinkSync(filePath); // Delete the uploaded file after processing
    return res.json({ message: 'Receipe data imported successfully!'});
  } catch(error){
    console.log(error);
    res.status(500).json(error);
  }
};

export const generateReceipe = async (req, res, next) => {
  const { recipeName } = req.query.receipeName;
  try {
    const client = new OpenAI({
      apiKey: OPENAI_API_KEY, // This is the default and can be omitted
    });

    // const response = await client.createCompletion({
    //   model: "text-davinci-003",
    //   prompt: `List the ingredients for ${recipeName} for 8 servings.`,
    //   max_tokens: 100,
    // });

    // Generate the recipe using OpenAI
    const response = await client.completions.create({
      // model: "text-davinci-003",
      model: "gpt-3.5-turbo-instruct",
      prompt: `Provide a detailed list of ingredients and steps for preparing ${recipeName} for 8 servings.`,
      max_tokens: 300,
      temperature: 0.7, // Adjust creativity
    });

    const recipe = response.choices[0].text.trim();
    console.log(`Recipe for ${recipeName}:\n`, recipe);
    return { recipeName, recipe };

    // const ingredients = response.data.choices[0].text.trim();
    // return res.json({ recipeName, ingredients });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
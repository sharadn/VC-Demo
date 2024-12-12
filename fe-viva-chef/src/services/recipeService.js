import axios from 'axios';

const BASE_URL = 'http://localhost:3001/api/v0'; // Replace with your actual API endpoint

const RecipeService = {
  async searchRecipes(searchTerm) {
    const response = await axios.get(`${BASE_URL}/recipes`, {
      params: {
        recipeName: searchTerm
      }
    });
    return response.data;
  },

  async getRecipeById(id) {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  }
};

export default RecipeService;
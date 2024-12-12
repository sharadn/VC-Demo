import { useState } from 'react';
import { TextField, List, ListItem, ListItemText, Button } from '@mui/material';
import RecipeService from '../services/recipeService.js';
import RecipeDetails from './RecipeDetails';
import GroceryChecklist from './GroceryChecklist';

const RecipeSearch = ({ user }) => {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [selectedRecipes, setSelectedRecipes] = useState([]);

  const handleSearch = async (e) => {
    setQuery(e.target.value);

    if (e.target.value) {
      try {
        //const response = await axios.get(`/recipes?recipeName=${e.target.value}`);
        const response = await RecipeService.searchRecipes(e.target.value);
        console.log('response:', response);
        setRecipes(response.slice(0, 5)); // Show up to 5 results
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    } else {
      setRecipes([]);
    }
  };

  const handleSelectRecipe = (recipe) => {
    console.log('Selected Recipe:', recipe);
    // Navigate to the recipe details or show it inline
    setSelectedRecipe(recipe);
    setRecipes([]); // Clear the search results after selecting a recipe
  };

  const handleAddToChecklist = () => {
    if (selectedRecipe && selectedRecipes.length < 4) {
      setSelectedRecipes((prev) => [...prev, selectedRecipe]);
      setSelectedRecipe(null); // Clear selected recipe after adding
    }
  };

  const handleBackToSearch = () => {
    setSelectedRecipe(null);
    setQuery('');
    setRecipes([]); // Clear the search results when going back to search
    setSelectedRecipes([]); // Clear the selected recipes list
  };

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        {/* Display user information after successful login */}
        <h3>Welcome, {user.name}</h3>
        {/* <img src={user.avatar} alt="User Profile" style={{ width: '50px', borderRadius: '50%' }} /> */}
      </div>

      <TextField
        label="Search Recipes"
        value={query}
        onChange={handleSearch}
        fullWidth
        margin="normal"
      />
      <List>
        {recipes.map((recipe) => (
          <ListItem
            key={recipe.receip_id}
            button
            onClick={() => handleSelectRecipe(recipe)}
          >
            <ListItemText primary={recipe.recipe_name} />
          </ListItem>
        ))}
      </List>

      {/* Show Recipe Details */}
      {selectedRecipe && (
        <div>
          <RecipeDetails recipe={selectedRecipe} />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddToChecklist}
            disabled={selectedRecipes.length >= 4}
          >
            Add to Checklist
          </Button>
        </div>
      )}

      {/* Show Grocery Checklist */}
      {selectedRecipes.length > 0 && (
        <GroceryChecklist selectedRecipes={selectedRecipes} onBackToSearch={handleBackToSearch}/>
      )}

    </div>
  );
};

export default RecipeSearch;

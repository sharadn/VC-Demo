import { Card, CardContent, Typography, Grid, Box, Button } from '@mui/material';

const consolidateIngredients = (recipes) => {
  const ingredientMap = {};

  recipes.forEach((recipe) => {
    recipe.ingredients.forEach(({ ingredient_name, quantity, unit }) => {
      if (!ingredientMap[ingredient_name]) {
        ingredientMap[ingredient_name] = { quantity: 0, unit };
      }
      ingredientMap[ingredient_name].quantity += quantity;
    });
  });

  return Object.entries(ingredientMap).map(([name, data]) => ({
    ingredient_name: name,
    ...data,
  }));
};

const GroceryChecklist = ({ selectedRecipes, onBackToSearch }) => {
  const consolidatedIngredients = consolidateIngredients(selectedRecipes);

  return (
    <Card sx={{ width: 400, margin: '16px auto', borderRadius: 2, boxShadow: 3 }}>
      <CardContent sx={{ padding: '16px' }}>
        <Typography variant="h6" gutterBottom>
          Grocery Checklist
        </Typography>

        {/* Ingredients List in Grid */}
        <Grid container spacing={1}>
          {consolidatedIngredients.map(({ ingredient_name, quantity, unit }) => (
            <Grid item xs={6} key={ingredient_name}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px',
                  backgroundColor: '#f4f4f4',
                  borderRadius: '4px',
                }}
              >
                <Typography variant="body2">
                  {quantity} {unit} {ingredient_name}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
        {/* Back to Search Button */}
        <Button
          variant="outlined"
          color="primary"
          fullWidth
          sx={{ marginTop: '16px' }}
          onClick={onBackToSearch} // Trigger the onBackToSearch function passed from the parent
        >
          Back to Search
        </Button>
      </CardContent>
    </Card>
  );
};

export default GroceryChecklist;

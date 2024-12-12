import { Card, CardContent, CardMedia, Typography, Grid, Box } from '@mui/material';

const RecipeDetails = ({ recipe }) => {
  return (
    <Card
      sx={{
        width: 300, // Set the width to a fixed value (like visiting card size)
        margin: '16px auto', // Center the card
        borderRadius: 2,
        boxShadow: 3,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Recipe Image */}
      <CardMedia
        component="img"
        height="120" // Reduced height of the image
        image="https://via.placeholder.com/400x200?text=Recipe+Image" // Placeholder image
        alt={recipe.recipe_name}
        sx={{ objectFit: 'cover', borderRadius: '4px 4px 0 0' }} // Rounded top corners
      />
      
      <CardContent sx={{ padding: '8px' }}>
        {/* Recipe Name and Servings */}
        <Typography variant="h6" gutterBottom sx={{ fontSize: '1rem' }}>
          {recipe.recipe_name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
          Servings: {recipe.servings}
        </Typography>
        
        {/* Ingredients */}
        <Typography variant="body1" sx={{ marginTop: 1, fontSize: '1rem' }}>
          Ingredients:
        </Typography>
        
        {/* Ingredients List */}
        <Grid container spacing={1}>
          {recipe.ingredients.map((ingredient) => (
            <Grid item xs={6} key={ingredient.ingredient_name}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '4px',
                  backgroundColor: '#f4f4f4',
                  borderRadius: '4px',
                  fontSize: '0.875rem',
                }}
              >
                <Typography variant="body2">
                  {ingredient.quantity} {ingredient.unit} {ingredient.ingredient_name}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default RecipeDetails;

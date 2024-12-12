import { Router } from "express";
import multer from "multer";
import { findOneRecipe, getAllRecipes, createRecipe, importCSV, generateReceipe } from "../controllers/recipeController.js";
const upload = multer({ dest: 'uploads/' }); // Temporary upload folder

const router = Router();

router.get('/', getAllRecipes); ///api/v0/recipes
router.get('/generate', generateReceipe);
router.get('/:receiptId', findOneRecipe);
router.post('/', createRecipe);
router.post('/import', upload.single('file'), importCSV);

export default router;
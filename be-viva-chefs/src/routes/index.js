import { Router } from 'express';
import authRouter from './auth.js';
import recipeRouter from './recipe.js';
const router = Router();

router.get('/', (req, res, next)=>{
  return res.json('Hello Route!!');
});

router.use('/auth', authRouter);
router.use('/api/v0/recipes', recipeRouter);

export default router;
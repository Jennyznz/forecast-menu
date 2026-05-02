import express from 'express';
import { renderCalendar, renderRecipeDetails, renderFavoritesList } from '../controllers/recipeController.js';

const router = express.Router();

// Routes using 'router' instead of 'app'
router.get('/', renderCalendar);
router.get('/recipe/:id', renderRecipeDetails);
router.get('/favorites', renderFavoritesList);

// Export router for app.js
export default router;
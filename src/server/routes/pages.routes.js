import express from 'express';
import { renderCalendar, renderRecipeDetails, renderFavoritesList } from '../controllers/recipe.controller.js';
import { renderLogin, renderSignUp } from '../services/user.service.js';

const router = express.Router();

// Routes using 'router' instead of 'app'
router.get('/', renderCalendar);
router.get('/recipe/:id', renderRecipeDetails);
router.get('/favorites', renderFavoritesList);
router.get('/user/login', renderLogin);
router.get('/user/signup', renderSignUp);

// Export router for app.js
export default router;
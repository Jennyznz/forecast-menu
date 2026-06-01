import express from 'express';
import * as mealsController from '../controllers/meals.controller.js';
import * as formsController from '../controllers/forms.controller.js';

const router = express.Router();

// Routes using 'router' instead of 'app'
router.get('/', mealsController.renderCalendar);
router.get('/recipe/:id', mealsController.renderRecipeDetails);
router.get('/favorites', mealsController.renderFavoritesList);
router.get('/user/login', formsController.renderLogin);
router.get('/user/signup', formsController.renderSignUp);

// Export router for app.js
export default router;
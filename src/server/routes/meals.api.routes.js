import express from 'express';
import * as mealsController from '../controllers/meals.controller.js';

const router = express.Router();

router.post('/regenerate', mealsController.regenerateMeal);
router.get('/shopping-list', mealsController.renderShoppingList);

export default router;
import express from 'express';
import * as favoritesController from '../controllers/favorites.controller.js';

const router = express.Router();

router.post('/toggle', favoritesController.toggleFavorite);

export default router;
import express from 'express';
import * as formsController from '../controllers/forms.controller.js';

const router = express.Router();

router.post('/add', formsController.addUser);
router.post('/login', formsController.verifyLogin);

export default router;

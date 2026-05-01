import 'dotenv/config';

import express from 'express';
import { renderCalendar, renderRecipeDetails } from './controllers/recipeController.js';
import mongoose from 'mongoose';
import morgan from 'morgan';

// Express app
const app = express();

// Register view engine
app.set('view engine', 'ejs');

// Connect to Database
const dbURI = process.env.MONGODB_URI;
// Exit app if URI is missing
if (!dbURI) {
  console.error('Error: MONGODB_URI is not defined in the environment variables.');
  process.exit(1); 
}

mongoose.connect(dbURI, {serverSelectionTimeoutMS: 5000 // Force fail after 5 seconds
  })
  .then((result) => {
    console.log('Connected to Database');
    // Listen for requests only after database is connected
    app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
  })
  .catch((err) => (console.log(err)));

// Middleware
app.use(express.static('public'));
app.use(morgan('dev'));


app.get('/', renderCalendar);
app.get('/recipe/:id', renderRecipeDetails);


import express from 'express';
// import { renderCalendar } from './controllers/recipeController.js';
import mongoose from 'mongoose';
import morgan from 'morgan';
import { User } from '../models/users.js';

// Express app
const app = express();

// Listen for requests
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

// Register view engine
app.set('view engine', 'ejs');

// Connect to Database
const dbURI = MONGODB_URI;
mongoose.connect(dbURI)
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


// app.get('/', renderCalendar);
// get user. deal w this later
// getWeeklyPlan
// call ejs with the result

export { app };

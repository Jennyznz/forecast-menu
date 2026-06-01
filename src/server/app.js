import 'dotenv/config';

import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import session from 'express-session';
import MongoStore from 'connect-mongo';

// Import routes
import mainRoutes from './routes/pages.routes.js';
import favoritesRoutes from './routes/favorites.api.routes.js';
import mealRoutes from './routes/meals.api.routes.js';
import userRoutes from './routes/forms.api.routes.js';

// Express app
const app = express();

// Register view engine
app.set('view engine', 'ejs');
app.set('views', 'src/server/views')

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
app.use(express.static('public'));  // Access to images and CSS
app.use(express.static('dist')); // Access to bundled JS
app.use(morgan('dev'));
app.use(express.json()); // Allows Express to read JSON sent from client
app.use(  // Check and attach session if one exists
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,  // does not resave after every request. Only for changes.
    saveUninitialized: false, // does not create empty sessions when users aren't logged in
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,  // sessions survive server restarts
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // session is stored for a week
      httpOnly: true, // security
    }
  })
)

// Mount routes
app.use('/', mainRoutes);
app.use('/api/favorites', favoritesRoutes);
app.use('/api/meals', mealRoutes);
app.use('/user', userRoutes);
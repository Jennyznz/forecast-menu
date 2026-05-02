import 'dotenv/config';

import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';

// Import routes
import mainRoutes from './routes/index.js';
import favoritesRoutes from './routes/favorites.js';

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
app.use(express.static('public'));  // Images and CSS
app.use(express.static('dist'));  // Bundled frontend JS
app.use(morgan('dev'));
app.use(express.json()); // Allows Express to read JSON sent from client

// Mount routes
app.use('/', mainRoutes);
app.use('/api/favorites', favoritesRoutes);

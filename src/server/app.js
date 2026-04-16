const express = require('express');

// Express app
const app = express();
// Listen for requests
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

// Register view engine
app.set('view engine', 'ejs');
// Middleware and static files
app.use(express.static('public'));

// Mount page routes
app.use('/', viewRoutes);
// Mount API routes
app.use('/api', apiRoutes);


app.get('/', (req, res) => {
    res.render('calendar');
});



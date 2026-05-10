function renderLogin(req, res) {
    try {
        res.render('loginForm');

    } catch (error) {
        console.log('Error loading login'); // Message for DEV
        res.status(500).send('Error loading login');    // Message for browser
    }
}

export { renderLogin }
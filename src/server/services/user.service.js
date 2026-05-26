function renderLogin(req, res) {
    try {
        res.render('loginForm');
    } catch (error) {
        console.log('Error loading login form'); // Message for DEV
        res.status(500).send('Error loading login form');    // Message for browser
    }
}

function renderSignUp(req, res) {
    try {
        console.log('SIGNUP');
        res.render('signupForm');
    } catch (error) {
        console.log('Error loading signup form');
        res.status(500).send('Error loading signup form');
    }
}

export { renderLogin, renderSignUp }
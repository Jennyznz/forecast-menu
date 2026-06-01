import * as formService from "../services/forms.service.js";

async function addUser(req, res) {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: "Missing required data" });
        }

        await formService.addUser(username, password);
        return res.status(200).json( { message: 'User successfully added! '});

    } catch (error) {
        console.error("Failed on route to add user:", error);

        if (error.message === 'Username already exists') {
            return res.status(400).json({ error: error.message });
        }

        return res.status(500).json({ error: error.message });
    }
}

async function verifyLogin(req, res) {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: "Missing required data" });
        }

        const user = await formService.verifyLogin(username, password);
        req.session.userId = user.id;
        return res.status(200).json({ message: "Login successful" });

    } catch (error) {
        console.error('Failed login attempt', error.message);

        if (error.message === 'Username does not exist' || error.message === 'Incorrect password') {
            return res.status(400).json({ error: error.message });
        }

        return res.status(500).json({ error: "Internal Server Error" });
    }
}

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
        res.render('signupForm');
    } catch (error) {
        console.log('Error loading signup form');
        res.status(500).send('Error loading signup form');
    }
}

export {
    addUser,
    verifyLogin,
    renderLogin,
    renderSignUp
};
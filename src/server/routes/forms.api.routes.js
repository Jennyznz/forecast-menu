import express from 'express';
import { addUser, verifyLogin } from '../services/user.service.js';

const router = express.Router();

router.post('/add', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: "Missing required data" });
        }

        await addUser(username, password);
        return res.status(200).json( { message: 'User successfully added! '});


    } catch (error) {
        console.error("Failed on route to add user:", error);

        if (error.message === 'Username already exists') {
            return res.status(400).json({ error: error.message });
        }

        return res.status(500).json({ error: error.message });
    }
});


router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: "Missing required data" });
        }

        const user = await verifyLogin(username, password);
        req.session.userId = user.id;
        return res.status(200).json({ message: "Login successful" });

    } catch (error) {
        console.error('Failed login attempt', error.message);

        if (error.message === 'Username does not exist' || error.message === 'Incorrect password') {
            return res.status(400).json({ error: error.message });
        }

        return res.status(500).json({ error: "Internal Server Error" });
    }
})

export default router;

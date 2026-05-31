import express from 'express';
import { addUser } from '../services/user.service.js';

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

export default router;

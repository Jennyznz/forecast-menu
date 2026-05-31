import { User } from "../models/User.model.js";
import crypto from 'crypto';
import bcrypt from 'bcrypt';

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

async function addUser(un, pw) {
    let user = await User.findOne({ username: un });
    if (user) {
        throw new Error('Username already exists');
    }

    const user_id = crypto.randomUUID();
    const saltRounds = 18;
    const pw_hashed = await bcrypt.hash(pw, saltRounds);
    
    user = new User({ id: user_id, username: un, password_hash: pw_hashed });
    console.log(user);
    await user.save();
    return user;
}


export { renderLogin, renderSignUp, addUser }
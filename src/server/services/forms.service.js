import User from "../models/User.model.js";
import crypto from 'crypto';
import bcrypt from 'bcrypt';

async function addUser(un, pw) {
    let user = await User.findOne({ username: un });
    if (user) {
        throw new Error('Username already exists');
    }

    const user_id = crypto.randomUUID();
    const saltRounds = 18;
    const pw_hashed = await bcrypt.hash(pw, saltRounds);
    
    user = new User({ id: user_id, username: un, password_hash: pw_hashed });
    await user.save();
}

async function verifyLogin(un, pwAttempt) {
    let user = await User.findOne({ username: un });
    if (!user) {
        throw new Error('Username does not exist');
    }

    const isMatch = await bcrypt.compare(pwAttempt, user.password_hash);

    if (!isMatch) {
        throw new Error('Incorrect password');
    }
    return user;
}

export {
    addUser,
    verifyLogin
};
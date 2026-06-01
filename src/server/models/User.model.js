import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password_hash: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);    // Finds plural of param1 and bases it on param2

export default User;
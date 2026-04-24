import mongoose from "mongoose";
const Schema = mongoose.Schema; // Defines structure of docs in collection

const userSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password_hash: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);    // Finds plural of param1 and bases it on param2

export { User }
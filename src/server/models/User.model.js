import mongoose from "mongoose";
const Schema = mongoose.Schema;

const shoppingListSchema = new Schema({
    // userId: {
    //     type: String,
    //     required: true,
    //     unique: true
    // },
    startDate: { String },
    items: [
        {
            ingredientId: { type: String }, // add quantities of ingredients with the same id
            name: { type: String},  // normalized name
            amount: { type: String},
            unit: { type: String },
            aisle: { type: String },
            checked: {
                type: Boolean,
                default: false
            }
        }
    ] 
});

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
    },
    shopping_list: { type: shoppingListSchema }
});

const User = mongoose.model('User', userSchema);    // Finds plural of param1 and bases it on param2

export default User;
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const shoppingListSchema = new Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
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

const ShoppingList = mongoose.model('shoppingList', shoppingListSchema);

export default ShoppingList;
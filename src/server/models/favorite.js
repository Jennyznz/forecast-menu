import mongoose from "mongoose";
const Schema = mongoose.Schema; 

const mealSchema = new Schema({
    day_name: { type: String, required: false }, // Ex: "Monday"
    meal_type: { type: String, required: false },    // Ex: "Breakfast"
    meal_time: { type: String, required: false },
    recipe_id: { type: Number, required: false },
    recipe_title: { type: String, required: false },    
    recipe_ready_time: { type: String, required: false},
    temp: { type: Number, required: false }                    // Stores the temperature used for recipe generation
});

const favoriteListSchema = new Schema({
    userId: {
        type: Number,
        required: true,
        unique: true // Only one favorites list per user
    },

    meals: {
        type: [mealSchema]
    }
});

const FavoritesList = mongoose.model('favorite', favoriteListSchema);    // Finds plural of param1 and bases it on param2

export { FavoritesList }
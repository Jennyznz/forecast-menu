import mongoose from "mongoose";
const Schema = mongoose.Schema; 

const mealSchema = new Schema({
    day_name: { type: String }, // Ex: "Monday"
    meal_type: { type: String },    // Ex: "Breakfast"
    meal_time: { type: String },
    recipe_id: { type: Number },
    recipe_title: { type: String },    
    recipe_ready_time: { type: String },
    temp: { type: Number },                    // Stores the temperature used for recipe generation
    favorite: { type: Boolean }
});

const favoriteListSchema = new Schema({
    userId: {
        type: String,
        required: true,
        unique: true // Only one favorites list per user
    },

    meals: {
        type: [mealSchema]
    }
});

const FavoritesList = mongoose.model('favorite', favoriteListSchema);    // Finds plural of param1 and bases it on param2

export default FavoritesList;
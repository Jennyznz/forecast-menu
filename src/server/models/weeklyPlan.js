import mongoose from "mongoose";
const Schema = mongoose.Schema; 

const mealSchema = new Schema({
    day_name: { type: String, required: false }, // Ex: "Monday"
    meal_type: { type: String, required: false },    // Ex: "Breakfast"
    meal_time: { type: String, required: false },
    recipe_id: { type: Number, required: false },
    recipe_title: { type: String, required: false },    
    recipe_ready_time: { type: String, required: false},
    temp: { type: Number, required: false }                    // Stores the temp used for recipe generation
});

const weeklyPlanSchema = new Schema({
    userId: {
        type: Number,
        required: true,
        unique: true // One weekly plan per user
    },
    // There can't be more than 21 meals in the array (in case user double clicks regenerate)
    meals: {
        type: [mealSchema],
        validate: {
            validator: function(v) {
                return v.length <= 21;
            }
        }
    }
});

const WeeklyPlan = mongoose.model('weeklyPlan', weeklyPlanSchema);    // Finds plural of param1 and bases it on param2

export { WeeklyPlan }
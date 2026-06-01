import mongoose from "mongoose";
const Schema = mongoose.Schema; 

const mealSchema = new Schema({
    day_name: { type: String }, // Ex: "Monday"
    meal_type: { type: String },    // Ex: "Breakfast"
    meal_time: { type: String },
    recipe_id: { type: Number },
    recipe_title: { type: String },    
    recipe_ready_time: { type: String },
    temp: { type: Number },                    // Stores the temp used for recipe generation
    favorite: { type: Boolean }
});

const weeklyPlanSchema = new Schema({
    userId: {
        type: String,
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

export default WeeklyPlan;
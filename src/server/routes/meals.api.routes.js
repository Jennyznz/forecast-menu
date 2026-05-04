import express from 'express';
import { FavoritesList } from '../models/Favorite.model.js';
import { WeeklyPlan } from '../models/WeeklyPlan.model.js';
import { createRecipe } from '../services/recipe.service.js';
import { getTempCategory } from '../services/weather.service.js';

const router = express.Router();

router.post('/regenerate', async (req, res) => {
    console.log('inside the api router!');
    try {
         // Unpack data sent from the frontend's JSON body
        const { userId, dayName, mealType } = req.body;
        console.log(userId, dayName, mealType);

        const userPlan = await WeeklyPlan.findOne({ userId: userId });
        const mealIndex = userPlan.meals.findIndex(
            (meal) => meal.day_name === dayName && meal.meal_type === mealType
        );
        console.log(mealIndex);
        console.log(userPlan.meals[mealIndex]);

        const currentMeal = userPlan.meals[mealIndex];
        const temp = currentMeal.temp;

        const tempCategory = getTempCategory(temp);
        const recipe = await createRecipe(tempCategory, mealType);

        // Check if the newly genereated recipe is in the user's favorites list, just in case
        const userFavorites = await FavoritesList.findOne({ userId: userId });
        const isFavorited = userFavorites?.meals.some(meal => meal.recipe_id === recipe.id);

        // Directly mutate recipe-specific properties in user's weekly plan
        userPlan.meals[mealIndex].recipe_id          = recipe.id;
        userPlan.meals[mealIndex].recipe_title       = recipe.title;
        userPlan.meals[mealIndex].recipe_ready_time  = recipe.readyInMinutes;
        userPlan.meals[mealIndex].favorite           = isFavorited;

        userPlan.markModified("meals"); // Tells Mongoose to look into the top-level field "meals" for modifications
        await userPlan.save();

        // Send new recipe data to client-side, to be displayed
        return res.status(200).json({
            newMeal: userPlan.meals[mealIndex]
        });

     } catch (error) {
        // Handle server/database crashes
        console.error("Failed to regenerate recipe:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }

});

export default router;
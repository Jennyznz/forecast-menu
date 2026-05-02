import express from 'express';
import { FavoritesList } from '../models/favorite.js';
import { WeeklyPlan } from '../models/weeklyPlan.js';

const router = express.Router();

router.post('/toggle', async (req, res) => {
    try {
        // Unpack data sent from the frontend's JSON body
        const { userId, recipeId, action } = req.body;
        // Safety check
        if (!userId || !recipeId || !action) {
            return res.status(400).json({ error: "Missing required data" });
        }

        // // Find the user's favorite list and weekly plan
        const userFavorites = await FavoritesList.findOne({ userId: userId });
        
        // Extract the specific meal object from the plan's array
        const userPlan = await WeeklyPlan.findOne({ userId: userId });
        const mealFromPlan = userPlan.meals.find(m => m.recipe_id === recipeId);

        // Handle 'add' logic
        if (action === 'add') {
            // Check if recipe already favorited to prevent duplicates
            const alreadyExists = userFavorites.meals.some(m => m.recipe_id === recipeId);
            if (!alreadyExists) {              
                // Update favorite status in user's weekly plan
                mealFromPlan.favorite = true;
                await userPlan.save();
        
                // Push and save to user's favorites list
                userFavorites.meals.push(mealFromPlan);
                await userFavorites.save();
            }
            // Send a success response back to the frontend
            return res.status(200).json({ message: "Successfully added to favorites!" });
        } 
        
        // Handle 'remove' logic
        else if (action === 'remove') {
            // Update favorite status in user's weekly plan
                mealFromPlan.favorite = false;
                await userPlan.save();

            // Remove recipe from user's favorites list
            userFavorites.meals.pull({ recipe_id: recipeId });
            await userFavorites.save();
            
            return res.status(200).json({ message: "Successfully removed from favorites!" });
        } 

        else {
            return res.status(400).json({ error: "Invalid action type" });
        }
        
    } catch (error) {
        // Handle server/database crashes
        console.error("Failed to toggle favorite:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
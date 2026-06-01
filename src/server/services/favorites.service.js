import FavoritesList from '../models/Favorite.model.js';
import WeeklyPlan from '../models/WeeklyPlan.model.js';

async function toggleFavorite(recipeId, action, userId) {
    // Find the user's favorite list and weekly plan
    const userFavorites = await FavoritesList.findOne({ userId: userId });
    // Extract the specific meal object from the plan's array
    const userPlan = await WeeklyPlan.findOne({ userId: userId });

    if (!userFavorites) {
        throw new Error("User's favorites list not found");
    }

    if (!userPlan) {
        throw new Error("User's weekly plan not found");
    }

    const mealFromPlan = userPlan.meals.find(m => m.recipe_id === recipeId);

    if (!mealFromPlan) {
        throw new Error("Could not find recipe in User's weekly plan");
    }

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
    } 
    
    // Handle 'remove' logic
    else if (action === 'remove') {
        // Update favorite status in user's weekly plan
            mealFromPlan.favorite = false;
            await userPlan.save();

        // Remove recipe from user's favorites list
        userFavorites.meals.pull({ recipe_id: recipeId });
        await userFavorites.save();
    } 
}

async function isFavorited(userId, recipeId) {
    const userFavorites = await FavoritesList.findOne({ userId: userId });
    if (!userFavorites) {
        throw new Error("User's favorites list not found");
    }
    return userFavorites?.meals.some(meal => meal.recipe_id === Number(recipeId));
}

async function getUserFavorites(userId) {
    const userFavorites = await FavoritesList.findOne({ userId: userId });
    if (!userFavorites) {
        throw new Error("User's favorites list not found");
    }
    return userFavorites;
}

export {
    toggleFavorite,
    isFavorited,
    getUserFavorites
};
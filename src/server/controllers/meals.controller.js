import * as weatherService from "../services/weather.service.js";
import * as recipeService from "../services/recipe.service.js";
import * as mealsService from "../services/meals.service.js";
import * as favoritesService from "../services/favorites.service.js";

async function regenerateMeal(req, res) {
    try {
        // Unpack data sent from the frontend's JSON body
        const { dayName, mealType } = req.body;

        await mealsService.regenerateMeal;

        // Send new recipe data to client-side, to be displayed
        return res.status(200).json({
            newMeal: userPlan.meals[mealIndex]
        });

     } catch (error) {
        // Handle server/database crashes
        console.error("Failed to regenerate recipe:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

async function renderCalendar(req, res) {
    try {
        const userId = req.session.userId;

        const response = await mealsService.renderCalendar(userId);

        res.render('calendar', { 
            weekLabel: response.text,
            weekDays: response.weekDays, 
            weekDates: response.weekDates, 
            mealPlan: response.formattedPlan 
        });

    } catch (err) {
        console.error('Error generating weekly recipes:', err);
        res.status(500).send('Could not load weekly recipe plan.');
    }
}

async function renderRecipeDetails(req, res) {
    try {
        const recipeId  = req.params.id;
        const fullRecipeDetails = await recipeService.fetchRecipeInfo(recipeId);

        // Check if recipe is in favorites
        const userId = req.session.userId;
        const favStatus = await favoritesService.isFavorited(userId, recipeId);

        // Render the EJS view using the fully populated Recipe object        
        res.render('recipe', { recipe: fullRecipeDetails, isFavorited: favStatus });
    } catch (error) {
        console.error("Error generating recipe:", error);   // Descriptive error message for development
        res.status(500).send("Error generating recipe.");   // Message for user's browser
    }
};

async function renderFavoritesList(req, res) {
    try {
        // Fetch favorites list from MongoDB
        const userFavorites = await favoritesService.getUserFavorites(req.session.userId);
        res.render('favorites', { favorites: userFavorites ? userFavorites.meals : [] });
    
    } catch (err) {
        console.error('Error loading favorites list:', err);
        res.status(500).send('Could not load favorites list.');
    }
}

export {
    regenerateMeal,
    renderCalendar,
    renderRecipeDetails,
    renderFavoritesList
};
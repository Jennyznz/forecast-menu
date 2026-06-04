import User from "../models/User.model.js";
import WeeklyPlan from "../models/WeeklyPlan.model.js";
import { fetchRecipeInfo } from "./recipe.service.js";


async function updateUserShoppingList(userId) {
    const user = await User.findOne({ id: userId });
    if (!user) {
        throw new Error('User not found');
    }

    const weeklyPlan = await WeeklyPlan.findOne({ userId: userId });
    if (!weeklyPlan) {
        throw new Error("User's weekly plan not found");
    }

    // Clear user's existing stored shopping list, or create an empty items array if it doesn't exist yet
    user.shopping_list.items = [];
    await user.save();

    for (const meal of weeklyPlan.meals) {
        const recipeId = meal.recipe_id;
        const recipe = await fetchRecipeInfo(recipeId);
        const ingredients = recipe.ingredients;
        ingredients.forEach(ingredient => {
            user.shopping_list.items.push({
                ingredientId: ingredient.id,
                name: ingredient.name,
                amount: ingredient.amount,
                unit: ingredient.unit,
                aisle: ingredient.aisle,
            })
        });
    }
    await user.save();
    return user.shopping_list.items;
}

export { updateUserShoppingList }
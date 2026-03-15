import { weatherRecipeProfiles } from "./recipeProfiles";

// Return a recipe object with API call data
async function createRecipe(category, mealType) {
    const url = buildSearchRecipeQuery(category, mealType);
    const res = await fetchRecipes(url);
    const rand = randRecipe(res);
    const recipe = new Recipe(rand);
    return recipe;
}

function buildSearchRecipeQuery(category, mealType) {
    // Pick a random profile under the given category
    const profiles = weatherRecipeProfiles[mealType][category];
    const randProfile = profiles[Math.floor(Math.random() * profiles.length)];

    // Build API parameters
    const parameters = { 
        query: randProfile.query,
        type: randProfile.type || undefined, // May not exist
        number: 10,  
        addRecipeInformation: true,
        addRecipeNutrition: true,
        fillIngredients: true,
        // instructionsRequired: true,
        apiKey: '-', 
    }

    // URL pieces
    const parameterString = new URLSearchParams(parameters).toString();   // Generates key-value pairs, and then, when converted into a string, adds '&' dividers between the parameters
    const base = `https://api.spoonacular.com/recipes/complexSearch`;

    return `${base}?${parameterString}`; 
}

async function fetchRecipes(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
}

// Get the index of a random recipe from the results fetched from the Spoonacular API
function randRecipe(res) {
    if (!res || res.length === 0 ) return null;
    const randIndex = Math.floor(Math.random() * res.length);
    return res[randIndex];
}


class Recipe {
    constructor(fullData) {   
        if (!fullData) {
            this.id = null;
            this.title = "No recipe found";
            this.ingredients = [];
            this.steps = [];
            return;
        } else {
            this.id = fullData.id;
            this.title = fullData.title || 'No recipes found';
            this.image = fullData.image;
            this.summary = fullData.summary;
            this.servings = fullData.servings;
            this.readyInMinutes = fullData.readyInMinutes;
            // Store ingredients as strings
            this.ingredients = fullData.extendedIngredients?.map(i => i.original) || [];
            // Store important/basic information about available nutrients
            this.nutrients = fullData.nutrition?.nutrients?.map(n => ({
                name: n.name,
                amount: n.amount,
                unit: n.unit,
                percent: n.percentOfDailyNeeds
            })) || [];
            // this.steps = fullData.analyzedInstructions?.[0]?.steps.map(s => s.step) || [];
        }
    }
}

export { createRecipe }
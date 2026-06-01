import Recipe from '../models/Recipe.model.js';
import categorizationService from './categorization.service.js';

const apiKey = process.env.SPOONACULAR_API_KEY;

// Return recipe object containing information on a specified recipe
async function fetchRecipeInfo(id) {
    const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    const recipe = new Recipe(data);
    return recipe;
}

// Return random recipe object for the specified category and meal
async function createRecipe(category, mealType) {
    let url = buildSearchRecipeQuery(category, mealType);
    let res = await fetchRecipes(url);
    let rand = randRecipe(res);
    let recipe = new Recipe(rand);

    let attempts = 0;
    const maxAttempts = 5;

    // If recipe not found, make another call
    while (recipe.title === 'No recipes found' && attempts < maxAttempts) {
        url = buildSearchRecipeQuery(category, mealType);
        res = await fetchRecipes(url);
        rand = randRecipe(res);
        recipe = new Recipe(rand);
        attempts++;
    }

    if (recipe.title === 'No recipes found') {
        console.log('recipe not found after 5 attempts');
    }

    return recipe;
}

function buildSearchRecipeQuery(category, mealType) {
    console.log('category:', category);
    console.log('meal type:', mealType);
    // Fetch a random search category
    const profiles = searchCategory[mealType][category];
    const randProfile = profiles[Math.floor(Math.random() * profiles.length)];

    // Build API parameters
    const parameters = { 
        query: randProfile.query,
        type: randProfile.type || undefined, // May not exist
        number: 10,  
        addRecipeInformation: true,
        addRecipeNutrition: true,
        fillIngredients: true,
        apiKey,     // shorthand property syntax
    }

    // URL pieces
    const parameterString = new URLSearchParams(parameters).toString();   // Generates key-value pairs, and then, when converted into a string, adds '&' dividers between the parameters
    const base = 'https://api.spoonacular.com/recipes/complexSearch';

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

export { 
    fetchRecipeInfo, 
    createRecipe 
}
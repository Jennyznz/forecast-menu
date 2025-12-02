import { tempColors } from "./weather";
import { weatherRecipeProfiles } from "./recipeProfiles";

// Display daily meal plans on the DOM
async function displayRecipes() {
    // Select DOM elements
    const days = document.querySelectorAll('.day');

    // Set meal times
    // For user input meal times, take the ceiling of the value. 
    // DO NOT let the user input comes from a text field! Make sure that it's selection-based
    const bTime = '8AM';
    const lTime = '12PM';
    const dTime = '5PM';

    // Get .chunk indices of meal times
    const bIndex = timeToIndex(bTime);
    const lIndex = timeToIndex(lTime);
    const dIndex = timeToIndex(dTime);

    for (const day of days) {
        const chunks = day.querySelectorAll('.chunk');
       
        // Locate the breakfast, lunch, and dinner chunks. Get meal category label.
        const bLabel = chunks[bIndex].dataset.label;
        const lLabel = chunks[lIndex].dataset.label;
        const dLabel = chunks[dIndex].dataset.label;

        // Spoonacular API call
        const [bRecipe, lRecipe, dRecipe] = await Promise.all([
            fetchRecipe(buildRecipeQuery(bLabel)),
            fetchRecipe(buildRecipeQuery(lLabel)),
            fetchRecipe(buildRecipeQuery(dLabel)),
            ]);

        // Select random recipes from the results returned by Spoonacular
        const [randB, randL, randD] = [getRandRecipe(bRecipe), getRandRecipe(lRecipe), getRandRecipe(dRecipe)];
        
        const breakfastTitle = randB?.title || "No recipe found";
        const lunchTitle = randL?.title || "No recipe found";
        const dinnerTitle = randD?.title || "No recipe found";

        // Create recipe objects for each meal
        const breakfast = new Recipe(breakfastTitle); // Search Recipe Info for more info later on?
        const lunch = new Recipe(lunchTitle);
        const dinner = new Recipe(dinnerTitle);

        // Display Recipe object. 
        const bMealBox = document.createElement('div'); // Have it sort of float over the second chunk?
        bMealBox.innerHTML = breakfast.title;
        bMealBox.classList.add('meal-box');
        chunks[bIndex].innerHTML = ''; // Clear before adding (User may generate recipes multiple times in a row)
        chunks[bIndex].append(bMealBox);

        const lMealBox = document.createElement('div'); 
        lMealBox.innerHTML = lunch.title;
        lMealBox.classList.add('meal-box');
        chunks[lIndex].innerHTML = '';  // Clear before adding
        chunks[lIndex].append(lMealBox);

        const dMealBox = document.createElement('div'); 
        dMealBox.innerHTML = dinner.title;
        dMealBox.classList.add('meal-box');
        chunks[dIndex].innerHTML = '';  // Clear before adding
        chunks[dIndex].append(dMealBox);
    }
}

// Helper function to generateRecipes()
function timeToIndex(timeStr) {
    const [num, suffix] = [parseInt(timeStr), timeStr.slice(-2)];

    if (suffix === 'AM') {
        return (num - 8) * 2;
    } else { // suffix === 'PM'
        if (num === 12) {
            return 8;   // Special case: 12PM
        } else {
            return 8 + (num * 2);
        }
    }
}

function buildRecipeQuery(category) {
    // Pick a random profile under the given category
    const profiles = weatherRecipeProfiles[category];
    const randProfile = profiles[Math.floor(Math.random() * profiles.length)];

    // Build API parameters
    const parameters = { 
        query: randProfile.query,
        type: randProfile.type || undefined, // May not exist
        number: 20,  
        apiKey: 'd20a6c6b176842699146780873ea40c3', // Outdated API key
    }

    // URL pieces
    const parameterString = new URLSearchParams(parameters).toString();   // This generates key-value pairs, and then, when converted into a string, adds '&' dividers between the parameters
    const base = `https://api.spoonacular.com/recipes/complexSearch`;

    return `${base}?${parameterString}`; 
}

async function fetchRecipe(url) {
    console.log(url);
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
}

// Get the index of a random recipe from the results fetched from the Spoonacular API
function getRandRecipe(recipe) {
    if (!recipe || recipe.length === 0 ) return null;
    const randIndex = Math.floor(Math.random() * recipe.length);

    return recipe[randIndex];
}

class Recipe {
    constructor(title) {    // LATER: image, prepTime
        this.title = title;
    }
}



export { displayRecipes };
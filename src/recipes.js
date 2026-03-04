import { tempColors } from "./weather";
import { weatherRecipeProfiles } from "./recipeProfiles";

// Display daily meal plans on the DOM
async function displayRecipes() {
    // Select DOM elements
    const days = document.querySelectorAll('.day');

    // Set meal times
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
        
        // const breakfastTitle = randB?.title || "No recipe found";
        // const lunchTitle = randL?.title || "No recipe found";
        // const dinnerTitle = randD?.title || "No recipe found";

        // Create recipe objects for each meal
        const breakfast = new Recipe(randB);
        const lunch = new Recipe(randL);
        const dinner = new Recipe(randD);

        // Display Recipe object and add Event Listeners
        const bMealBox = document.createElement('div'); // Have it sort of float over the second chunk?
        bMealBox.recipeData = breakfast;
        bMealBox.innerHTML = breakfast.title;
        bMealBox.classList.add('meal-box');
        mealListener(bMealBox);
        chunks[bIndex].innerHTML = ''; // Clear before adding (User may generate recipes multiple times in a row)
        chunks[bIndex].append(bMealBox);

        const lMealBox = document.createElement('div'); 
        lMealBox.recipeData = lunch;
        lMealBox.innerHTML = lunch.title;
        lMealBox.classList.add('meal-box');
        mealListener(lMealBox);
        chunks[lIndex].innerHTML = '';  // Clear before adding
        chunks[lIndex].append(lMealBox);

        const dMealBox = document.createElement('div'); 
        dMealBox.recipeData = dinner;
        dMealBox.innerHTML = dinner.title;
        dMealBox.classList.add('meal-box');
        mealListener(dMealBox);
        chunks[dIndex].innerHTML = '';  // Clear before adding
        chunks[dIndex].append(dMealBox);
    }
}

function mealListener(box) {
    box.addEventListener('click', () => {
        const recipeObject = box.recipeData;
        const popup = displayPopup(recipeObject, box);
        document.addEventListener('click', (e) => {
            if (!popup.contains(e.target)) {
                removePopup(box);
            }
        })

    });
}

function displayPopup(recipe, box) {
    // Create elements
    const popup = document.createElement('div');
    popup.classList.add('popup');
    const title = document.createElement('div');
    const image = document.createElement('img');
    const summary = document.createElement('div');
    const ingLabel = document.createElement('h4');
    const ing = document.createElement('ul');
    const stepsLabel = document.createElement('h4');
    const steps = document.createElement('ul');

    // Fill elements with content
    title.textContent = recipe.title;
    image.src = recipe.image;
    summary.innerHTML = recipe.summary || '';     // Spoonacular summaries usually contain HTML tags
    ingLabel.textContent = 'Ingredients';
    ing.innerHTML =
        recipe.ingredients.map(i => `<li>${i}</li>`).join('') || ''; // What does .join do here?
    stepsLabel.textContent = 'How To Cook';
    steps.innerHTML =
        recipe.steps.map(s => `<li>${s}</li>`).join('') || '';

    // Append elements
    popup.append(title, image, summary, ingLabel, ing, stepsLabel, steps);
    const chunk = box.parentElement;
    chunk.append(popup);

    return popup;
}

function removePopup(box) {
    const chunk = box.parentElement;
    const popup = chunk.querySelector('.popup');
    popup.remove();
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
        addRecipeInformation: true,
        addRecipeNutrition: true,
        fillIngredients: true,
        instructionsRequired: true,
        apiKey: '05713a7b3c03472f851322df4155af20', // Outdated API key
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

            this.steps = fullData.analyzedInstructions?.[0]?.steps.map(s => s.step) || [];
        }

    }
}

export { displayRecipes };
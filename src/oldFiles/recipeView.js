import { displayCalendarView } from "./oldFiles/calendarView";
import { fetchRecipeInfo } from "./spoonacularAPI";

async function displayRecipe(meal) {
    const main = document.getElementById('main-container');
    main.textContent = '';

    const recipeContainer = document.createElement('div');
    recipeContainer.id = 'recipe-view-container';
    recipeContainer.dataset.id = meal.dataset.id;
    recipeContainer.dataset.title = meal.dataset.title;
    recipeContainer.dataset.readyTime = meal.dataset.readyTime;
    recipeContainer.dataset.favorite = meal.dataset.favorite;

    const recipe = await fetchRecipeInfo(meal.dataset.id);

    recipeContainer.append(
        createToolbar(meal.dataset.favorite), 
        createTitle(recipe.title), 
        createPhoto(recipe.image), 
        createDescription(recipe.summary), 
        createIngredients(recipe.ingredients),
        // createInstructions()
    );
    
    main.append(recipeContainer);
}

function createToolbar(favorite) {
    const toolbar = document.createElement('div');
    toolbar.id = 'toolbar';

    const toolbarLeft = document.createElement('div');
    toolbarLeft.id = 'toolbar-left'

    const toolbarRight= document.createElement('div');
    toolbarRight.id = 'toolbar-right'
    
    const backBtn = document.createElement('button');
    backBtn.id = 'back-btn';
    backBtn.textContent = '< Back';

    toolbarLeft.append(backBtn);

    const saveBtn = document.createElement('button');
    saveBtn.id = 'recipe-view-fave-btn';
    if (favorite === 'true') {
        saveBtn.classList.add('filled-favorite');
    } else {
        saveBtn.classList.add('favorite');
    }

    // const editBtn = document.createElement('button');
    // editBtn.id = 'edit-btn';
    // editBtn.textContent = 'Edit';

    toolbarRight.append(saveBtn);

    toolbar.append(toolbarLeft, toolbarRight);
    return toolbar;
}

function createTitle(name) {
    const title = document.createElement('h1');
    title.id = 'title';
    title.textContent = name; 
    return title;
}

function createPhoto(img) {
    const photo = document.createElement('img');
    photo.id = 'recipe-view-photo';
    photo.src = img; 
    photo.alt = 'Photo of recipe';

    return photo;
}

function createDescription(summary) {
    const description = document.createElement('div');
    description.id = 'description';
    description.innerHTML = summary;   
    return description;
}

function createIngredients(ingredients) {
    const container = document.createElement('div');
    container.id = 'ingredients-container';
    
    const label = document.createElement('h2');
    label.id = 'ingredients-label';
    label.textContent = 'Ingredients: ';

    const list = document.createElement('ul');
    list.id = 'ingredients-list';

    ingredients.forEach(i => {
        const ingredient = document.createElement('li');  
        ingredient.classList.add('ingredient');
        ingredient.textContent = `${i.name} (${i.amount} ${i.unit})`;
        list.append(ingredient);
    });

    container.append(label, list);
    return container;
}

// function createInstructions() {
//     const container = document.createElement('div');
//     container.id = 'instructions-container';
    
//     const label = document.createElement('h2');
//     label.id = 'instructions-label';
//     label.textContent = 'Instructions: ';

//     const list = document.createElement('ol');
//     list.id = 'instructions-list';

//     const instruction = document.createElement('li');    
//     instruction.classList.add('instruction');
//     instruction.textContent = 'Instruction One';
//     list.append(instruction);

//     container.append(label, list);
//     return container;
// }

export { displayRecipe };
import clockI from "../assets/clock.svg";

const favorites = [];

function displayFavorites() {
    const mainContainer = document.getElementById('main-container');
    mainContainer.textContent = '';

    const header = document.createElement('h1');
    header.textContent = "Saved Recipes";
    const content = document.createElement('div');

    favorites.forEach(item => {
        const meal = document.createElement('div');
        meal.classList.add('fav-meal');

        const actions = document.createElement('div');
        actions.classList.add('actions');
        const favorite = document.createElement('button');
        favorite.classList.add('favorite');
        favorite.dataset.action = 'favorite';
        actions.append(favorite);

        const recipeTitle = document.createElement('div');
        recipeTitle.classList.add('recipe-title');
        recipeTitle.textContent = item.dataset.title;
    
        const readyTimeContainer = document.createElement('div');
        readyTimeContainer.classList.add('ready-time-container');
        const clockIcon = document.createElement('img');
        clockIcon.src = clockI;
        clockIcon.classList.add('clock-icon');
        const readyTime = document.createElement('div');
        readyTime.classList.add('recipe-ready-time');
        readyTime.textContent = item.dataset.readyTime;
        readyTimeContainer.append(clockIcon, readyTime);
    
        meal.append(actions, recipeTitle, readyTimeContainer);
        content.append(meal);
    });

    mainContainer.append(header, content);
}

export { displayFavorites, favorites }
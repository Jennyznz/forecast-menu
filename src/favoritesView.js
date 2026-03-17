import clockI from "../assets/clock.svg";
import { favorites } from ".";

function displayFavorites() {
    const mainContainer = document.getElementById('main-container');
    mainContainer.textContent = '';

    const favesContainer = document.createElement('div');
    favesContainer.id = 'faves-view-container';

    const nav = document.createElement('div');
    nav.id = 'faves-view-nav-bar';

    const backBtn = document.createElement('button');
    backBtn.id = 'back-btn';
    backBtn.textContent = '< Back';

    nav.append(backBtn);

    const header = document.createElement('h1');
    header.id = 'faves-view-header';
    header.textContent = "Your Favorites";
    const content = document.createElement('div');
    content.id = 'faves-view-content';

    favorites.forEach(item => {
        const meal = document.createElement('div');
        meal.classList.add('meal');

        const actions = document.createElement('div');
        actions.classList.add('actions');
        const favorite = document.createElement('button');
        favorite.classList.add('filled-favorite');
        favorite.dataset.action = 'favorite';
        actions.append(favorite);

        const recipeTitle = document.createElement('div');
        recipeTitle.classList.add('recipe-title');
        recipeTitle.textContent = item.title;
    
        const readyTimeContainer = document.createElement('div');
        readyTimeContainer.classList.add('ready-time-container');
        const clockIcon = document.createElement('img');
        clockIcon.src = clockI;
        clockIcon.classList.add('clock-icon');
        const readyTime = document.createElement('div');
        readyTime.classList.add('recipe-ready-time');
        readyTime.textContent = item.readyTime;
        readyTimeContainer.append(clockIcon, readyTime);

        meal.dataset.id = item.id;
        meal.dataset.title = item.title;
        meal.dataset.readyTime = item.readyTime;
        meal.dataset.favorite = 'true';
    
        meal.append(actions, recipeTitle, readyTimeContainer);
        content.append(meal);
    });

    favesContainer.append(nav, header, content);
    mainContainer.append(favesContainer);
}

export { displayFavorites, favorites }
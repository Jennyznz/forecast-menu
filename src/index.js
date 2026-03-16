import { displayFavorites } from './favoritesView.js';
import { displayCalendarView, regenerateMealCards, regenerateMeal } from './calendarView.js';
import { displayRecipe } from './recipeView.js';
import { favorites } from './favoritesView.js';
import './styles.css';


await displayCalendarView();

const mainContainer = document.querySelector('#main-container');
mainContainer.addEventListener('click', async (e) => {
    // Meal card actions
    if (e.target.closest('.actions')) {
        const btn = e.target.closest('button');
        if (!btn) return;

        const meal = e.target.closest('.meal');
        if (btn.dataset.action === 'regenerate') {
            await regenerateMeal(meal);
        } else if (btn.dataset.action === 'favorite') {
            favorites.push(meal);
        }
        return;
    }
    // Meal card
    if (e.target.closest('.meal')) {
        const meal = e.target.closest('.meal')
        const recipeId = meal.dataset.id;   
        mainContainer.textContent = '';
        mainContainer.append(await displayRecipe(recipeId));     
        return;   
    } 
    // Back button from recipeView
    if (e.target.id === 'back-btn') {
        mainContainer.textContent = '';
        await displayCalendarView();
    }
    if (e.target.closest('.fav-meal')) {
        const meal = e.target.closest('.meal')
        const recipeId = meal.dataset.id;   
        mainContainer.textContent = '';
        mainContainer.append(await displayRecipe(recipeId));   
    }
});

const regenerateBtn = document.querySelector('#regenerate');
regenerateBtn.addEventListener('click', async () => {
    await regenerateMealCards();
});

const favoritesBtn = document.querySelector('#favorites');
favoritesBtn.addEventListener('click', () => {
    displayFavorites();
});
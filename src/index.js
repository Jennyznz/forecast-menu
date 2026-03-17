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
            const basicInfo = {
                id: meal.dataset.id,
                title: meal.dataset.title,
                readyTime: meal.dataset.readyTime
            };
            favorites.push(basicInfo);
        }
        return;
    }
    // Meal card in calendarView
    if (e.target.closest('.meal')) {
        const meal = e.target.closest('.meal')
        const recipeId = meal.dataset.id;   
        await displayRecipe(recipeId);     
        return;   
    } 
    // Back button from recipeView
    if (e.target.id === 'back-btn') {
         await displayCalendarView();
         return
    }
    // Meal card in favoritesView
    if (e.target.closest('.fav-meal')) {    // *
        const meal = e.target.closest('.meal')
        const recipeId = meal.dataset.id;   
        await displayRecipe(recipeId);   
        return
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
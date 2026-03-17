import { displayFavorites } from './favoritesView.js';
import { displayCalendarView, regenerateMealCards, regenerateMeal } from './calendarView.js';
import { displayRecipe } from './recipeView.js';
import './styles.css';

let favorites = [];

await displayCalendarView();

const mainContainer = document.querySelector('#main-container');
mainContainer.addEventListener('click', async (e) => {
    // Meal card actions in calendarView and favoritesView
    if (e.target.closest('.actions')) {

        const btn = e.target.closest('button');
        if (!btn) return;

        const meal = e.target.closest('.meal');
        if (btn.dataset.action === 'regenerate') {
            await regenerateMeal(meal);
            
        } else if (btn.dataset.action === 'favorite') {
            if (meal.dataset.favorite != 'true') {
                // Add to Favorites
                const basicInfo = {
                    id: meal.dataset.id,
                    title: meal.dataset.title,
                    readyTime: meal.dataset.readyTime
                };
                favorites.push(basicInfo);
                const faveBtn = meal.querySelector('.favorite');
                faveBtn.classList.remove('favorite');
                faveBtn.classList.add('filled-favorite');
                meal.dataset.favorite = 'true';
            } else {
                // Remove from Favorites
                favorites = favorites.filter(item => item.id !== meal.dataset.id);
                const faveBtn = meal.querySelector('.favorite');
                faveBtn.classList.remove('filled-favorite');
                faveBtn.classList.add('favorite');
                meal.dataset.favorite = 'false';
            }
        }
        return;
    }
    // Meal card in calendarView
    if (e.target.closest('.meal')) {
        const meal = e.target.closest('.meal')  
        await displayRecipe(meal);     
        return;   
    } 
    // Back button from recipeView
    if (e.target.id === 'back-btn') {
         await displayCalendarView();
         return;
    }
    // Favorite button in recipeView
    if (e.target.id === 'recipe-view-fave-btn') {
        const container = e.target.closest('#recipe-view-container');
        const faveBtn = e.target;
        if (container.dataset.favorite === 'true') {
            // Remove from favorites
            favorites = favorites.filter(item => item.id !== container.dataset.id);
            faveBtn.classList.remove('filled-favorite');
            faveBtn.classList.add('favorite');
            container.dataset.favorite = 'false'
        } else {
            // Add to favorites
            const basicInfo = {
                    id: container.dataset.id,
                    title: container.dataset.title,
                    readyTime: container.dataset.readyTime
                };
            favorites.push(basicInfo);
            faveBtn.classList.remove('favorite');
            faveBtn.classList.add('filled-favorite');
            container.dataset.favorite = 'true'
        }
        return;
    }

    // Meal card in favoritesView
    if (e.target.closest('.meal')) {    // *
        const meal = e.target.closest('.meal')
        await displayRecipe(meal);   
        return;
    }

});

const regenerateBtn = document.querySelector('#regenerate');
regenerateBtn.addEventListener('click', async () => {
    await regenerateMealCards();
});

const favoritesBtn = document.querySelector('#all-favorites');
favoritesBtn.addEventListener('click', () => {
    displayFavorites();
});

export { favorites }
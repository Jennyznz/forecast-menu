import { displayCalendarView } from './calendarView.js';
import { displayRecipe } from './recipeView.js';
import './styles.css';

await displayCalendarView();

const mainContainer = document.querySelector('#main-container');
mainContainer.addEventListener('click', async (e) => {
    const meal = e.target.closest('.meal');

    if (meal) {
        const recipeId = meal.dataset.id;   
        mainContainer.textContent = '';
        mainContainer.append(await displayRecipe(recipeId));        
    } else if (e.target.id === 'back-btn') {
        mainContainer.textContent = '';
        await displayCalendarView();
    }
});

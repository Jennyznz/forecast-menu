import { displayCalendarView } from './calendarView.js';
import { displayRecipe } from './recipeView.js';
import './styles.css';

displayCalendarView();

const mainContainer = document.querySelector('#main-container');
mainContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('calendar-recipe')) {
        const recipeId = e.target.dataset.id;   // Parameter for later
        mainContainer.textContent = '';
        mainContainer.append(displayRecipe());
    } else if (e.target.id === 'back-btn') {
        mainContainer.textContent = '';
        displayCalendarView();
    }
});

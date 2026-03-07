import { displayCalendarView } from './calendarView.js';
import { displayRecipe } from './recipeView.js';
import './styles.css';

displayCalendarView();

const calendarRecipes = document.querySelectorAll('.calendar-recipe');
calendarRecipes.forEach(recipe => {
    recipe.addEventListener('click', () => {
        // Clear main container
        const mainContainer = document.querySelector('#main-container');
        mainContainer.textContent = '';
        // Navigate to recipe page
        mainContainer.append(displayRecipe()); // TO ADD: recipe identifier(s)
    });
});

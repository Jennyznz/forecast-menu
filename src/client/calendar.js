// import { FavoritesList } from "../server/models/favorite.js";
// import { WeeklyPlan } from "../server/models/weeklyPlan.js";

const testing = 5;

const mainContainer = document.querySelector('#main-container');
mainContainer.addEventListener('click', async (e) => {
    // // Meal card actions in calendarView and favoritesView
    if (e.target.closest('.actions')) {

    //     const btn = e.target.closest('button');
    //     if (!btn) return;

    //     const meal = e.target.closest('.meal');
    //     if (btn.dataset.action === 'regenerate') {
    // //         await regenerateMeal(meal);
            
    //     } else if (btn.dataset.action === 'favorite') {
    //         console.log("HEY");
    //         const recipeId = meal.dataset.id;

    //         const userPlan = await WeeklyPlan.findOne({ userId: testing });
    //         const userFavorites = await FavoritesList.findOne({ userId: testing });

    //         const mealFromPlan = await userPlan.findOne({ 'meals.recipe_id' : recipeId });
    //         const isFavorite = await userFavorites.findOne({ 'meals.recipe_id': recipeId });
            
    //         if (!isFavorite) {
    //             // Add to Favorites database
    //             userFavorites.meals.push({ mealFromPlan });
    //             await userFavorites.save()
    //             // Fill the favorite icon in the view
    //             const faveBtn = meal.querySelector('.favorite');
    //             faveBtn.classList.add('filled');
    //         } else {
    //             // Remove from Favorites database
    //             userFavorites.meals.pull({ mealFromPlan });
    //             await userFavorites.save()
    //             // Empty the favorite icon in the view
    //             const faveBtn = meal.querySelector('.favorite');
    //             faveBtn.classList.remove('filled');
    //         }
    //     }
    //     return;
    }

    // Meal card in calendarView
    if (e.target.closest('.meal')) {
        const meal = e.target.closest('.meal');
        const id = meal.getAttribute('data-id');
        console.log('Meal ID:', id);
        try {
            window.location.href = (`/recipe/${id}`);
        } catch (err) {
            console.error("Failed to load recipe page. ", err);
        }
        return;   
    } 

    // Back button from recipeView and favoritesView
    if (e.target.id === 'back-btn') {
        displayCalendarView();
        return;
    }

    // // Favorite button in recipeView
    // if (e.target.id === 'recipe-view-fave-btn') {
    //     const container = e.target.closest('#recipe-view-container');
    //     const faveBtn = e.target;
    //     if (container.dataset.favorite === 'true') {
    //         // Remove from favorites array
    //         favorites = favorites.filter(item => item.id !== container.dataset.id);
    //         faveBtn.classList.remove('filled');
    //         container.dataset.favorite = 'false'
    //         // Update weeklyRecipes array
    //         updateFavoriteStatus(Number(container.dataset.id), 'false');
    //     } else {
    //         // Add to favorites
    //         const basicInfo = {
    //                 id: container.dataset.id,
    //                 title: container.dataset.title,
    //                 readyTime: container.dataset.readyTime
    //             };
    //         if (!favorites.some(item => item.id == basicInfo.id)) {
    //             favorites.push(basicInfo);
    //         }
    //         faveBtn.classList.add('filled');
    //         container.dataset.favorite = 'true'
    //         // Update weeklyRecipes array
    //         updateFavoriteStatus(Number(container.dataset.id), 'true');  
    //     }
    //     return;
    // }

    // // Meal card in favoritesView
    // if (e.target.closest('.meal')) {    // *
    //     const meal = e.target.closest('.meal')
    //     await displayRecipe(meal);   
    //     return;
    // }
});

// const regenerateBtn = document.querySelector('#regenerate');
// regenerateBtn.addEventListener('click', async () => {
//     await regenerateMealCards();
// });

const favoritesBtn = document.querySelector('#all-favorites');
favoritesBtn.addEventListener('click', () => {
    try {
        window.location.href = ('/favorites');
    } catch (err) {
        console.error("Failed to load favorites page. ", err);
    }
});

const lightDarkBtn = document.querySelector('#light-dark-mode');
const root = document.documentElement;
lightDarkBtn.addEventListener('click', () => {
    const currentTheme = root.getAttribute('data-theme');
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', nextTheme);
});
// const userProfileBtn = document.querySelector('#user-profile');
// userProfileBtn.addEventListener('click', () => {
//     displayForms();
// });

// export { favorites }
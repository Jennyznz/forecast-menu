const mainContainer = document.querySelector('#main-container');
mainContainer.addEventListener('click', async (e) => {
    // // Meal card actions in calendarView and favoritesView
    // if (e.target.closest('.actions')) {

    //     const btn = e.target.closest('button');
    //     if (!btn) return;

    //     const meal = e.target.closest('.meal');
    //     if (btn.dataset.action === 'regenerate') {
    //         await regenerateMeal(meal);
            
    //     } else if (btn.dataset.action === 'favorite') {
    //         if (meal.dataset.favorite != 'true') {
    //             // Add to Favorites
    //             const basicInfo = {
    //                 id: meal.dataset.id,
    //                 title: meal.dataset.title,
    //                 readyTime: meal.dataset.readyTime,
    //                 favorite: 'true'
    //             };
    //             // Update favorites array if the recipe is not already favorited
    //             if (!favorites.some(item => item.id == basicInfo.id)) {
    //                 favorites.push(basicInfo);
    //             }
    //             const faveBtn = meal.querySelector('.favorite');
    //             faveBtn.classList.add('filled');
    //             meal.dataset.favorite = 'true';
    //             // Update weeklyRecipes array
    //             updateFavoriteStatus(Number(meal.dataset.id), 'true');  // Dataset values are always strings!
    //         } else {
    //             // Remove from Favorites
    //             favorites = favorites.filter(item => item.id !== meal.dataset.id);
    //             const faveBtn = meal.querySelector('.favorite');
    //             faveBtn.classList.remove('filled');
    //             meal.dataset.favorite = 'false';
    //             // Update weeklyRecipes array
    //             updateFavoriteStatus(Number(meal.dataset.id), 'false');
                
    //         }
    //     }
    //     return;
    // }

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

// const favoritesBtn = document.querySelector('#all-favorites');
// favoritesBtn.addEventListener('click', () => {
//     displayFavorites();
// });

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
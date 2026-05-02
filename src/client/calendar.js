const USER_ID = process.env.TEST_ID;

const mainContainer = document.querySelector('#main-container');
mainContainer.addEventListener('click', async (e) => {
    // If the click is within a button
    const btn = e.target.closest('button');
    if (btn) {
        const meal = e.target.closest('.meal');
        const recipeId = meal.dataset.id;

        if (btn.dataset.action === 'regenerate') {
    //         await regenerateMeal(meal);
            
        } else if (btn.dataset.action === 'favorite') {
            const faveBtn = meal.querySelector('.favorite');

            // Check if it's currently favorited by looking at the UI
            const isCurrentlyFavorited = faveBtn.classList.contains('filled');
            
            try {
                // Send a POST request to server
                const response = await fetch('/api/favorites/toggle', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        userId: USER_ID, 
                        recipeId: Number(recipeId), // Cast to Number type since dataset values are always strings
                        action: isCurrentlyFavorited ? 'remove' : 'add'
                    })
                });

                if (response.ok) {
                    // Update UI only if the database successfully updated
                    if (isCurrentlyFavorited) {
                        faveBtn.classList.remove('filled');
                    } else {
                        faveBtn.classList.add('filled');
                    }
                } else {
                    console.error("Server failed to update favorites");
                }
            } catch (err) {
                console.error("Network error:", err);
            }
        }
        return;
    }

    // Meal card in calendarView
    else if (e.target.closest('.meal')) {
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
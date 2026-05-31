const calendarView = document.querySelector('#main-container.calendar-view');
if (calendarView) {
    calendarView.addEventListener('click', async (e) => {
        // Capture clicks on action buttons within each recipe
        const btn = e.target.closest('button');
        if (btn) {
            const meal = e.target.closest('.meal');
            const recipeId = meal.dataset.id;

            // Regenerate a single recipe
            if (btn.dataset.action === 'regenerate') {
                try {
                    // Send a POST request to server to update weeklyPlan data stored for the user
                    const response = await fetch('/api/meals/regenerate', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ 
                            dayName: meal.dataset.day,
                            mealType: meal.dataset.type
                        })
                    });

                    if (response.ok) {
                        const data = await response.json();
                        const newMeal = data.newMeal; 

                        // Update the DOM elements inside .meal
                        meal.dataset.id = newMeal.recipe_id;
                        const favBtn = meal.querySelector('.favorite');
                        favBtn.className= 'favorite';   // Resets class of .favorite button to just contain favorite
                        if (newMeal.favorite) {
                            favBtn.classList.add('filled');
                        }
                        const title = meal.querySelector('.recipe-title');
                        title.textContent = newMeal.recipe_title;
                        const readyTime = meal.querySelector('.recipe-ready-time');
                        readyTime.textContent = newMeal.recipe_ready_time;

                    } else {
                        console.error("Server failed to regenerate recipe");
                    }
                } catch (err) {
                    console.error("Network error:", err);
                }
                
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

        // Capture clicks on recipes
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
    });

    const regenerateBtn = document.querySelector('#regenerate');
    regenerateBtn.addEventListener('click', async () => {
    const allMeals = document.querySelectorAll('.meal');
    for (const meal of allMeals) {
        try {
            // Send a POST request to server to update weeklyPlan data stored for the user
            const response = await fetch('/api/meals/regenerate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    dayName: meal.dataset.day,
                    mealType: meal.dataset.type
                })
            });

            if (response.ok) {
                const data = await response.json();
                const newMeal = data.newMeal; 

                // Update the DOM elements inside .meal
                meal.dataset.id = newMeal.recipe_id;
                const favBtn = meal.querySelector('.favorite');
                favBtn.className = 'favorite';   // Resets class of .favorite button to just contain favorite
                if (newMeal.favorite) {
                    favBtn.classList.add('filled');
                }
                const title = meal.querySelector('.recipe-title');
                title.textContent = newMeal.recipe_title;
                const readyTime = meal.querySelector('.recipe-ready-time');
                readyTime.textContent = newMeal.recipe_ready_time;

            } else {
                console.error("Server failed to regenerate recipe");
            }
        } catch (err) {
                console.error("Network error:", err);
        }
    }
});
}



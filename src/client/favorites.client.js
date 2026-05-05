const USER_ID = 17;

const favesView = document.querySelector('#main-container.favorites-view');

if (favesView) {
    favesView.addEventListener('click', async (e) => {
    // Back button from favorites page
    if (e.target.id === 'back-btn') {
        window.location.href = '/';
        return;
    }

    // Capture clicks on action buttons within each recipe
    const btn = e.target.closest('.actions button');
    if (btn) {
        const meal = e.target.closest('.meal');
        const recipeId = meal.dataset.id;

            if (btn.dataset.action === 'favorite') {
            // Check if it's currently favorited by looking at the UI
            const isCurrentlyFavorited = btn.classList.contains('filled');
            
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
                        btn.classList.remove('filled');
                    } else {
                        btn.classList.add('filled');
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
}
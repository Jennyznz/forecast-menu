const USER_ID = 16;

const mainContainer = document.getElementById('main-container');
mainContainer.addEventListener('click', async (e) => {

    // Back button from recipe page
    if (e.target.id === 'back-btn') {
        window.location.href = '/';
        return;
    }

    // Favorite button
    if (e.target.id === 'recipe-view-fave-btn') {
        const recipeId = e.target.dataset.id;
        // Check if it's currently favorited by looking at the UI
        const isCurrentlyFavorited = e.target.classList.contains('filled');
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
                    e.target.classList.remove('filled');
                } else {
                    e.target.classList.add('filled');
                }
            } else {
                console.error("Server failed to update favorites");
            }
        } catch (err) {
            console.error("Network error:", err);
        }
    }
    return;
});

const favoritesBtn = document.querySelector('#all-favorites');
favoritesBtn.addEventListener('click', () => {
    try {
        window.location.href = ('/favorites');
    } catch (err) {
        console.error("Failed to load favorites page. ", err);
    }
});
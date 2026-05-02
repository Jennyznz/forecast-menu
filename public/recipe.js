const mainContainer = document.getElementById('main-container');
mainContainer.addEventListener('click', async (e) => {
    // Back button from recipeView 
    if (e.target.id === 'back-btn') {
        window.location.href = ('/');
        return;
    }
});